'use client';

export function Header() {
  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <a href="#work" className="nav-link">Home</a>
        <a href="#work" className="nav-link">Work</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>
      <a href="#contact" className="nav-cta">
        <span className="status-dot" />
        Sign Up
      </a>
    </nav>
  );
}
