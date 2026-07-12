'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqs = [
  {
    q: 'How long does setup take?',
    a: 'Most businesses are live within 48 hours. We handle PMS integration, custom training, and staff onboarding.'
  },
  {
    q: 'Is patient data secure?',
    a: 'Yes. We\'re HIPAA compliant with enterprise-grade encryption, audit logs, and regular security audits.'
  },
  {
    q: 'Can it integrate with my PMS?',
    a: 'We integrate with all major PMS systems including Open Dental, Dentrix, Eaglesoft, and custom APIs.'
  },
  {
    q: 'What if a call needs a human?',
    a: 'The AI seamlessly transfers complex cases to your staff with full context. You maintain complete control.'
  },
  {
    q: 'How much does it cost?',
    a: 'Pricing starts at $299/month. ROI typically achieved within 60 days based on appointment lift.'
  },
  {
    q: 'What languages does it support?',
    a: 'English, Spanish, French, German, and more coming soon. Custom language training available.'
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.container}>
        <h2>Frequently Asked Questions</h2>

        <div className={styles.list}>
          {faqs.map((item, i) => (
            <div key={i} className={`${styles.item} ${open === i ? styles.isOpen : ''}`}>
              <button className={styles.question} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{item.q}</span>
                <span className={styles.toggle}>▼</span>
              </button>
              {open === i && <p className={styles.answer}>{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
