import React from 'react';
import './ThemeToggle.css';

export default function ThemeToggle({ theme, setTheme }) {
  const toggle = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      aria-label="Toggle theme"
    >
      <span className="icon sun">☀️</span>
      <span className="switch" aria-hidden="true">
        <span className="knob" />
      </span>
      <span className="icon moon">🌙</span>
    </button>
  );
}

