'use client';

import styles from './Industries.module.css';

const industries = [
  { name: 'Dental', icon: '🦷', benefit: '30% more appointments booked' },
  { name: 'Medspas', icon: '💆', benefit: 'Book treatments 24/7' },
  { name: 'HVAC', icon: '🌡️', benefit: 'Same-day emergency scheduling' },
  { name: 'Veterinary', icon: '🐾', benefit: 'After-hours appointment handling' },
  { name: 'Salons', icon: '✂️', benefit: 'Reduce no-shows with confirmations' },
  { name: 'Plumbing', icon: '🔧', benefit: 'Emergency call routing' },
];

export default function Industries() {
  return (
    <section id="industries" className={styles.industries}>
      <div className={styles.container}>
        <h2>Built for Your Industry</h2>
        <p className={styles.subtitle}>Customized AI for service-based businesses</p>

        <div className={styles.grid}>
          {industries.map((ind, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{ind.icon}</div>
              <h3>{ind.name}</h3>
              <p>{ind.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
