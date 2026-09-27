'use client';

import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-bar">
      <span className="header-location">Hyderabad, India</span>
      <span className="header-brand">The Shivaji Portfolio</span>
      <button
        className="header-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
      {menuOpen && (
        <nav className="nav-links" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--color-parchment)', borderBottom: '1px solid var(--color-ink-black)', flexDirection: 'column', padding: '20px' }}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      )}
    </header>
  );
}
