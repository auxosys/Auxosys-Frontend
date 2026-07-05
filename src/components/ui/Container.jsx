import React from 'react';

export function Container({ children, className = '' }) {
  return (
    <div className={`ds-container ${className}`}>
      {children}
    </div>
  );
}
