"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function BackButton({ fallback = "/", label = "Back" }) {
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button onClick={handleBack} className="ds-back-btn">
      <ArrowLeft size={16} strokeWidth={2.5} />
      {label}
    </button>
  );
}
