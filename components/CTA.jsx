'use client';

import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <h2>Ready to Never Miss a Call Again?</h2>
        <p>Join 500+ businesses using AI Receptionist to capture every customer opportunity</p>

        <div className={styles.buttons}>
          <button className="btn btn-primary btn-lg">Book a Demo</button>
          <button className="btn btn-secondary btn-lg">Call +1 (415) 555-9999</button>
        </div>

        <p className={styles.offer}>
          🎁 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
