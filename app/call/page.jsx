'use client';

import styles from './call.module.css';

export default function CallAgent() {
  const agentNumber = '+14847465311';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Call Our AI Receptionist</h1>

        <div className={styles.agentInfo}>
          <span className={styles.avatar}>📞</span>
          <p className={styles.subtitle}>Talk to our AI receptionist instantly</p>
        </div>

        <a href={`tel:${agentNumber}`} className={styles.callButton}>
          Call {agentNumber}
        </a>

        <div className={styles.info}>
          <p className={styles.infoText}>
            Click the button above to place a call to our AI receptionist.
          </p>
          <p className={styles.highlight}>
            Available 24/7 • No hold times • Instant response
          </p>
        </div>
      </div>
    </div>
  );
}
