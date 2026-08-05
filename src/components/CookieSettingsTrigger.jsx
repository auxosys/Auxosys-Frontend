import React from 'react';

const CookieSettingsTrigger = ({ className }) => {
  const handleOpenSettings = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-cookie-settings'));
  };

  return (
    <button 
      onClick={handleOpenSettings}
      className={`text-gray-400 hover:text-white transition-colors text-sm ${className || ''}`}
      aria-label="Manage Cookie Preferences"
    >
      Manage Cookie Preferences
    </button>
  );
};

export default CookieSettingsTrigger;
