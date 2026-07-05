import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full relative z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-start gap-4">
          <button className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#1a1a2e] hover:bg-gray-100 transition-colors shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex flex-col">
            <Link href="/" className="text-white text-3xl font-light tracking-wide flex items-center" style={{ fontFamily: 'sans-serif' }}>
              Infosys
            </Link>
            <div className="text-white/80 text-sm mt-1 flex items-center gap-1 font-light">
              Navigate your next <span className="text-white/60 text-xs ml-1">&gt;</span>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="hidden lg:flex items-center">
          <div className="flex items-center bg-[#b8bac3] rounded-full px-1 py-1 shadow-inner">
            <Link href="#" className="px-5 py-2 text-[#1a1a2e] text-[15px] font-medium hover:bg-black/10 rounded-full transition-colors">
              Navigate your next
            </Link>
            <Link href="#" className="px-5 py-2 text-[#1a1a2e] text-[15px] font-medium hover:bg-black/10 rounded-full transition-colors">
              Investors
            </Link>
            <Link href="#" className="px-5 py-2 text-[#1a1a2e] text-[15px] font-medium hover:bg-black/10 rounded-full transition-colors">
              Infosys Knowledge Institute
            </Link>
            <Link href="#" className="px-5 py-2 text-[#1a1a2e] text-[15px] font-medium hover:bg-black/10 rounded-full transition-colors">
              Careers
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          <button className="flex items-center gap-2 bg-gradient-to-br from-[#2a2a3a] to-[#0a0a1a] text-white px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 transition-all shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 22.5l1.865-5.364a2.25 2.25 0 0 0-2.34-2.905l-5.364.865 6.596-.813a2.25 2.25 0 0 0 2.905-2.34l.813-6.596.865 5.364a2.25 2.25 0 0 0 2.34 2.905l5.364-.865-6.596.813a2.25 2.25 0 0 0-2.905 2.34l-.813 6.596-.865-5.364a2.25 2.25 0 0 0-2.34-2.905l-5.364.865z" />
            </svg>
            <span className="text-[15px] font-medium">Ask AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}
