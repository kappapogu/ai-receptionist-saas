'use client';

import { useState } from 'react';
import styles from './phone.module.css';

export default function PhoneTestPage() {
  const [callTime, setCallTime] = useState(0);
  const [isCalling, setIsCalling] = useState(false);

  const phoneNumber = '+14847465311';

  const handleCallClick = () => {
    setIsCalling(true);
    setCallTime(0);

    // Timer for call duration
    const timer = setInterval(() => {
      setCallTime((prev) => prev + 1);
    }, 1000);

    // Stop timer after 2 minutes (just for display)
    setTimeout(() => {
      clearInterval(timer);
    }, 120000);

    // Simulate ending call after 2 mins
    setTimeout(() => {
      setIsCalling(false);
      setCallTime(0);
    }, 120000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.outer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Test Retell AI Phone Number</h1>
          <p className={styles.subtitle}>Call our AI receptionist directly</p>
        </div>

        <div className={styles.card}>
          <div className={styles.phoneDisplay}>
            <span className={styles.label}>Dial:</span>
            <a
              href={`tel:${phoneNumber}`}
              onClick={handleCallClick}
              className={`${styles.phoneNumber} ${isCalling ? styles.calling : ''}`}
            >
              {phoneNumber}
            </a>
            <p className={styles.description}>Tap to call from your phone</p>
          </div>

          {isCalling && (
            <div className={styles.callActive}>
              <div className={styles.callTimer}>
                <span>📞 In Call</span>
                <span className={styles.time}>{formatTime(callTime)}</span>
              </div>
              <p className={styles.callStatus}>You're speaking with the AI receptionist...</p>
            </div>
          )}

          <div className={styles.info}>
            <h3>What to expect:</h3>
            <ul>
              <li>🤖 AI receptionist answers automatically</li>
              <li>💬 Can book appointments, answer questions</li>
              <li>🔄 Full two-way conversation</li>
              <li>24/7 available - call anytime</li>
              <li>🎯 No hold times - instant response</li>
            </ul>
          </div>

          <div className={styles.features}>
            <h3>Try these conversations:</h3>
            <div className={styles.featureList}>
              <div className={styles.feature}>
                <span className={styles.icon}>📅</span>
                <p>"I'd like to schedule an appointment"</p>
              </div>
              <div className={styles.feature}>
                <span className={styles.icon}>❓</span>
                <p>"What are your business hours?"</p>
              </div>
              <div className={styles.feature}>
                <span className={styles.icon}>👤</span>
                <p>"I'm a new patient"</p>
              </div>
              <div className={styles.feature}>
                <span className={styles.icon}>🏥</span>
                <p>"What services do you offer?"</p>
              </div>
            </div>
          </div>

          <div className={styles.browser}>
            <p>💡 Want to test in your browser instead?</p>
            <a href="/call" className={styles.browserLink}>
              Go to Browser Demo →
            </a>
          </div>
        </div>

        <div className={styles.footer}>
          <p>Phone Number: <strong>{phoneNumber}</strong></p>
          <p>Status: <strong className={styles.active}>🟢 Active</strong></p>
        </div>
      </div>
    </div>
  );
}
