'use client';

import styles from './Features.module.css';

const features = [
  { icon: '📅', title: 'Smart Booking', desc: 'Books appointments in real-time, checks availability, confirms with patients automatically' },
  { icon: '💬', title: 'Lead Qualification', desc: 'Asks qualifying questions and routes qualified leads to your team instantly' },
  { icon: '📱', title: 'Missed Call Recovery', desc: 'Automatically texts missed callers with booking links to recover lost opportunities' },
  { icon: '🚨', title: 'Emergency Detection', desc: 'Recognizes urgent situations and routes to staff or emergency contacts immediately' },
  { icon: '📊', title: 'Real-Time Analytics', desc: 'Dashboard shows call volume, bookings, revenue impact, and call quality metrics' },
  { icon: '🔒', title: 'HIPAA Compliant', desc: 'Enterprise-grade security with encryption, audit logs, and data compliance features' },
];

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <h2>What Your AI Receptionist Does</h2>
        <p className={styles.subtitle}>Never miss a customer again</p>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
