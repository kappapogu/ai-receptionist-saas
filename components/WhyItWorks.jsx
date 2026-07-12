'use client';

import styles from './WhyItWorks.module.css';

export default function WhyItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>Why It Works</h2>
        <div className={styles.grid}>
          <div className={styles.stat}>
            <div className={styles.number}>+35%</div>
            <p>More Appointments Booked</p>
          </div>
          <div className={styles.stat}>
            <div className={styles.number}>80%</div>
            <p>Calls Handled Automatically</p>
          </div>
          <div className={styles.stat}>
            <div className={styles.number}>24/7</div>
            <p>Always Available</p>
          </div>
          <div className={styles.stat}>
            <div className={styles.number}>-40%</div>
            <p>Staff Workload Reduced</p>
          </div>
        </div>

        <div className={styles.highlight}>
          <p><strong>Every missed call is a customer who called your competitor next.</strong> Our AI ensures you capture every opportunity, 24/7.</p>
        </div>
      </div>
    </section>
  );
}
