'use client';

import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#industries">Industries</a></li>
              <li><a href="#">API Docs</a></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">HIPAA BAA</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <p><a href="tel:+14155559999">+1 (415) 555-9999</a></p>
            <p><a href="mailto:hello@receptai.com">hello@receptai.com</a></p>
            <div className={styles.socials}>
              <a href="#" title="LinkedIn">🔗</a>
              <a href="#" title="Twitter">𝕏</a>
              <a href="#" title="GitHub">🐙</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} ReceptAI. All rights reserved.</p>
          <p>Powered by <strong>Retell AI</strong> &amp; <strong>Claude</strong></p>
        </div>
      </div>
    </footer>
  );
}
