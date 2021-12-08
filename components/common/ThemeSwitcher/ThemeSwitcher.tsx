import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import SunIcon from '@/components/icons/Sun';
import MoonIcon from '@/components/icons/Moon';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);

  const { setTheme, theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <button type="button" onClick={toggleTheme} aria-label="toggle theme">
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeSwitcher;
