import { useState, useEffect } from "react";
import { apiClient } from "../helper/apiClient";

export const usePermissions = (moduleName) => {
  const [canRead, setCanRead] = useState(false);
  const [canWrite, setCanWrite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPermission = async () => {
      try {
        const res = await apiClient.get("/profile/me");
        const admin = res.data?.data?.admin;
        
        if (!isMounted) return;
        
        if (!admin) {
          setCanRead(false);
          setCanWrite(false);
          setLoading(false);
          return;
        }

        if (admin.email === "auxosys@gmail.com") {
          setCanRead(true);
          setCanWrite(true);
        } else {
          const perms = admin.permissions || [];
          
          let readAccess = false;
          let writeAccess = false;
          
          for (const p of perms) {
            if (typeof p === 'string' && p === moduleName) {
              readAccess = true;
              writeAccess = true; // Legacy
              break;
            } else if (p.module === moduleName) {
              if (p.access === 'Read') {
                readAccess = true;
              } else if (p.access === 'Read & Write') {
                readAccess = true;
                writeAccess = true;
              }
              break;
            }
          }
          
          setCanRead(readAccess);
          setCanWrite(writeAccess);
        }
      } catch {
        if (isMounted) {
          setCanRead(false);
          setCanWrite(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPermission();
    return () => {
      isMounted = false;
    };
  }, [moduleName]);

  return { canRead, canWrite, loading };
};
