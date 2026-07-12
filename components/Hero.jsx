'use client';

import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Don't read about AI receptionists.</h1>
          <h1 className={styles.highlight}>Call one.</h1>

          <p className={styles.subtitle}>
            Meet your AI receptionist. It answers calls, books appointments, qualifies leads, and recovers missed calls 24/7 — so you never lose a customer.
          </p>

          <div className={styles.industries}>
            <span>For:</span>
            <span>Dentists</span>
            <span>Medspas</span>
            <span>HVAC</span>
            <span>Salons</span>
            <span>Veterinarians</span>
            <span>And more</span>
          </div>

          <div className={styles.buttons}>
            <button className="btn btn-primary btn-lg">Book Free Demo</button>
            <button className="btn btn-secondary">Call our AI now →</button>
          </div>

          <p className={styles.trust}>
            Trusted by 500+ businesses • Powered by Retell AI & Claude
          </p>
        </div>

        <div className={styles.demo}>
          <div className={styles.demoBox}>
            <div className={styles.avatar}>🤖</div>
            <h3>Try Our AI Receptionist</h3>
            <p>Click below to talk to our AI</p>
            <button className="btn btn-primary">Start Demo Call</button>
            <p className={styles.demoOr}>or call +1 (415) 555-9999</p>
          </div>
        </div>
      </div>
    </section>
  );
}
