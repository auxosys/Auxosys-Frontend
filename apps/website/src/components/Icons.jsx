// components/Icons.tsx
// Clean, single-weight line icons (24x24, stroke-based) for Auxosys.
// All icons inherit color via currentColor so they pick up theme/card styles.

import React from 'react';

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconBrain = (props) => (
  <svg {...base} {...props}>
    <path d="M9 4.5a2.5 2.5 0 0 0-2.5 2.5v.2A2.8 2.8 0 0 0 4.5 10v.6A2.6 2.6 0 0 0 3 13a2.6 2.6 0 0 0 1.6 2.4A2.8 2.8 0 0 0 7 19h2V4.5Z" />
    <path d="M15 4.5a2.5 2.5 0 0 1 2.5 2.5v.2A2.8 2.8 0 0 1 19.5 10v.6A2.6 2.6 0 0 1 21 13a2.6 2.6 0 0 1-1.6 2.4A2.8 2.8 0 0 1 17 19h-2V4.5Z" />
    <path d="M9 8h2M9 12h2M9 16h2M13 8h2M13 12h2M13 16h2" />
  </svg>
);

export const IconCRM = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 9h18" />
    <circle cx="7.5" cy="13.5" r="1.4" />
    <path d="M11 13h7M11 16.2h5" />
  </svg>
);

export const IconCloud = (props) => (
  <svg {...base} {...props}>
    <path d="M7 18a4 4 0 0 1-.6-7.95A5 5 0 0 1 16 9a3.5 3.5 0 0 1 1 6.9" />
    <path d="M7 18h10" />
  </svg>
);

export const IconTools = (props) => (
  <svg {...base} {...props}>
    <path d="M14.7 6.3a3 3 0 0 0 4.2 4.2l-6.6 6.6-2.1-2.1" />
    <path d="M10.5 17.4 6.6 21.3 2.7 17.4l3.9-3.9" />
    <path d="m9.3 12.3-2-2 1-1 2 2" />
    <path d="M19.5 4.5 18 6l1 1 1.5-1.5z" />
  </svg>
);

export const IconAI = (props) => (
  <svg {...base} {...props}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    <circle cx="10" cy="11" r="0.6" fill="currentColor" />
    <circle cx="14" cy="11" r="0.6" fill="currentColor" />
    <path d="M9.5 14c.7.6 1.6.6 1.5.6.6 0 1.3 0 1.5-.6" />
  </svg>
);

export const IconSaaS = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M10 16v4M14 16v4" />
    <path d="M7 9h4M7 12h6" />
    <circle cx="16.5" cy="8.5" r="1.2" />
  </svg>
);

export const IconWeb = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </svg>
);

export const IconMobile = (props) => (
  <svg {...base} {...props}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
    <path d="M11 19h2" />
  </svg>
);

export const IconBlockchain = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="6" height="6" rx="1.2" />
    <rect x="15" y="3" width="6" height="6" rx="1.2" />
    <rect x="3" y="15" width="6" height="6" rx="1.2" />
    <rect x="15" y="15" width="6" height="6" rx="1.2" />
    <path d="M9 6h6M6 9v6M18 9v6M9 18h6" />
  </svg>
);

export const IconBulb = (props) => (
  <svg {...base} {...props}>
    <path d="M9 18h6" />
    <path d="M10 21h4" />
    <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
  </svg>
);

export const IconDesign = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.6 1.5-1.4 0-.4-.2-.7-.4-1-.3-.3-.4-.6-.4-1 0-.8.6-1.4 1.4-1.4H16a3 3 0 0 0 3-3c0-5-3.1-8.2-7-8.2Z" />
    <circle cx="7.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="9.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const IconHealthcare = (props) => (
  <svg {...base} {...props}>
    <path d="M19.5 12.6 12 20 4.5 12.6a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0L12 7l1-.9a4.6 4.6 0 0 1 6.5 6.5Z" />
    <path d="M9 11h2v-2h2v2h2v2h-2v2h-2v-2H9z" />
  </svg>
);

export const IconFinance = (props) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="6" width="19" height="13" rx="2" />
    <path d="M2.5 10h19" />
    <path d="M6 14h4" />
    <circle cx="17" cy="14.2" r="1.4" />
  </svg>
);

export const IconEducation = (props) => (
  <svg {...base} {...props}>
    <path d="M2.5 8 12 3.5 21.5 8 12 12.5Z" />
    <path d="M6 10v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" />
    <path d="M21.5 8v6" />
  </svg>
);

export const IconRetail = (props) => (
  <svg {...base} {...props}>
    <path d="M4 9h16l-1.2 9.4a2 2 0 0 1-2 1.6H7.2a2 2 0 0 1-2-1.6L4 9Z" />
    <path d="M8.5 9V6a3.5 3.5 0 0 1 7 0v3" />
  </svg>
);

export const IconManufacturing = (props) => (
  <svg {...base} {...props}>
    <path d="M3 20V11l5 4v-4l5 4v-4l4.5 3.6V8L21 11.5V20Z" />
    <path d="M3 20h18" />
    <circle cx="17" cy="6" r="1.2" />
  </svg>
);

export const IconRealEstate = (props) => (
  <svg {...base} {...props}>
    <path d="M4 11 12 4l8 7" />
    <path d="M6 10v9.5a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1V10" />
  </svg>
);

export const IconLogistics = (props) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="7" width="11" height="9" rx="1.2" />
    <path d="M13.5 10.5H17l3 3V16h-6.5z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="16.5" cy="18" r="1.6" />
  </svg>
);

export const IconStartup = (props) => (
  <svg {...base} {...props}>
    <path d="M14.5 3.5c2.5.3 4 1.8 4.3 4.3-2.4 4.4-5.6 7.2-9.6 9-1.7-.4-3-1.7-3.4-3.4 1.8-4 4.6-7.2 9-9.6Z" />
    <circle cx="13" cy="11" r="1.4" />
    <path d="M9 15 6 18M5 16l-2 2" />
  </svg>
);

export const IconLightning = (props) => (
  <svg {...base} {...props}>
    <path d="M12.5 2.5 5 13h5l-1.5 8.5L19 11h-5l-1-8.5Z" />
  </svg>
);

export const IconShield = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3 5 6v6c0 4.6 3 7.7 7 9 4-1.3 7-4.4 7-9V6Z" />
    <path d="m9 12 2 2 4-4.5" />
  </svg>
);

export const IconScale = (props) => (
  <svg {...base} {...props}>
    <path d="M4 19h6M4 19l3-9 3 9M4 13h6" />
    <path d="M14 19h6M14 19l3-13 3 13M14 13h6" />
  </svg>
);

export const IconSearch = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.3-4.3" />
  </svg>
);

export const IconHandshake = (props) => (
  <svg {...base} {...props}>
    <path d="M2 12h4l3-3 3 3 1.5-1.5L17 14" />
    <path d="m11 9 2.5-2.5a2 2 0 0 1 2.8 0L18 8.2" />
    <path d="M18 8.2 22 12l-4 4-2-2" />
    <path d="m7 12 3 3 2-2" />
  </svg>
);

export const IconSupport = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3.5" />
    <path d="m5.8 5.8 3 3M18.2 5.8l-3 3M5.8 18.2l3-3M18.2 18.2l-3-3" />
  </svg>
);
