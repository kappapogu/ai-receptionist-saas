'use client';

import { useState } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>ReceptAI</div>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.open : ''}`}>
          <a href="#features">Features</a>
          <a href="#industries">Industries</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className={styles.actions}>
          <a href="tel:+14155559999" className={styles.phone}>📞 +1 (415) 555-9999</a>
          <button className="btn btn-primary">Book Demo</button>
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
