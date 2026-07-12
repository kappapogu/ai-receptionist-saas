'use client';

import styles from './Pricing.module.css';

const plans = [
  {
    name: 'Starter',
    price: '$299',
    period: '/month',
    features: ['100 calls/month', 'Basic analytics', 'Email support', 'One AI agent'],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '$799',
    period: '/month',
    features: ['500 calls/month', 'Advanced analytics', 'Priority support', 'Multiple agents', 'Custom training'],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Unlimited calls', 'Custom integrations', 'Dedicated support', 'White-label options'],
    cta: 'Contact Sales',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className={styles.container}>
        <h2>Simple, Transparent Pricing</h2>
        <p className={styles.subtitle}>Choose the plan that fits your business</p>

        <div className={styles.grid}>
          {plans.map((plan, i) => (
            <div key={i} className={`${styles.card} ${plan.popular ? styles.popular : ''}`}>
              {plan.popular && <span className={styles.badge}>Most Popular</span>}
              <h3>{plan.name}</h3>
              <div className={styles.price}>
                <span className={styles.amount}>{plan.price}</span>
                <span className={styles.period}>{plan.period}</span>
              </div>
              <ul className={styles.features}>
                {plan.features.map((f, j) => (
                  <li key={j}>✓ {f}</li>
                ))}
              </ul>
              <button className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          ROI typically achieved within 60 days. All plans include 14-day free trial.
        </p>
      </div>
    </section>
  );
}
