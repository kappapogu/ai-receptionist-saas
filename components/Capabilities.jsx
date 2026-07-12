'use client';

import styles from './Capabilities.module.css';

const capabilities = [
  {
    title: 'AI Receptionist',
    desc: 'Inbound calls, appointment booking, lead qualification',
    icon: '📞'
  },
  {
    title: 'AI Conference Bridge',
    desc: 'Real-time call support for complex customer interactions',
    icon: '🎤'
  },
  {
    title: 'Intelligence Suite',
    desc: 'Post-call analytics, sentiment analysis, ROI tracking',
    icon: '📊'
  },
];

export default function Capabilities() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2>Three Powerful Capabilities</h2>
        <p className={styles.subtitle}>Choose what you need</p>

        <div className={styles.grid}>
          {capabilities.map((cap, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{cap.icon}</div>
              <h3>{cap.title}</h3>
              <p>{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
