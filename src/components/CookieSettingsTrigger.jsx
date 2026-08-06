import React from 'react';

const CookieSettingsTrigger = ({ className }) => {
  const handleOpenSettings = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-cookie-settings'));
  };

  return (
    <button 
      onClick={handleOpenSettings}
      className={className || ''}
      aria-label="Manage Cookie Preferences"
    >
      Manage Cookie Preferences
    </button>
  );
};

export default CookieSettingsTrigger;
