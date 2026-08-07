import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShieldCheck } from 'lucide-react';
import styles from './VerifyPortal.module.css';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://auxosys-backend.onrender.com';

export default function VerifyPortal() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query || query.trim().length < 3) {
      setError('Please enter at least 3 characters to search.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(`${API_BASE}/api/verify/search?q=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to search');
      }

      setResults(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Certificate Verification | Auxosys</title>
        <meta name="description" content="Verify the authenticity of Auxosys certificates." />
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="https://auxosys.com" className={styles.logo}>
            <Image src="/Auxosys-icon-mono-dark.svg" alt="Auxosys Logo" width={32} height={32} />
            <span>AUXOSYS</span>
          </Link>
        </div>

        <main className={styles.main}>
          <div className={styles.heroSection}>
            <div className={styles.iconWrapper}>
              <ShieldCheck size={48} color="#14B8A6" />
            </div>
            <h1 className={styles.title}>Certificate Verification Portal</h1>
            <p className={styles.description}>
              Enter a Certificate ID, Employee ID, or Recipient Name below to instantly verify the authenticity and status of an Auxosys issued certificate.
            </p>

            <form onSubmit={handleSearch} className={styles.searchForm}>
              <div className={styles.searchBar}>
                <Search className={styles.searchIcon} size={20} />
                <input
                  type="text"
                  placeholder="e.g. AUXCERT-2026-1024 or EMP-204"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.searchInput}
                  disabled={loading}
                />
                <button type="submit" className={styles.searchButton} disabled={loading}>
                  {loading ? 'Searching...' : 'Verify'}
                </button>
              </div>
              {error && <p className={styles.errorMsg}>{error}</p>}
            </form>
          </div>

          {results !== null && (
            <div className={styles.resultsSection}>
              {results.length === 0 ? (
                <div className={styles.noResults}>
                  <p>No certificates found matching "{query}".</p>
                  <span className={styles.noResultsSub}>Double-check the ID or name and try again.</span>
                </div>
              ) : (
                <div className={styles.resultsList}>
                  <h3 className={styles.resultsHeader}>Search Results ({results.length})</h3>
                  {results.map((cert) => (
                    <Link href={`/verify/${cert.id}`} key={cert.id} className={styles.resultCard}>
                      <div className={styles.resultMain}>
                        <h4>{cert.recipient_name}</h4>
                        <span className={styles.certType}>{cert.cert_type}</span>
                      </div>
                      <div className={styles.resultMeta}>
                        <span className={styles.certNumber}>{cert.certificate_number}</span>
                        <span className={`${styles.statusBadge} ${styles[cert.status]}`}>
                          {cert.status === 'valid' ? 'Valid' : cert.status === 'revoked' ? 'Revoked' : 'Expired'}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
