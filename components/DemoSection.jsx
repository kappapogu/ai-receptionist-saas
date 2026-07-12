'use client';

import { useState, useEffect } from 'react';
import styles from './DemoSection.module.css';

export default function DemoSection() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Check if Retell is configured
  useEffect(() => {
    fetch('/api/retell/status')
      .then(r => r.json())
      .then(data => {
        setIsConfigured(data.configured);
      })
      .catch(err => console.error('Failed to check Retell status:', err));
  }, []);

  const handleInitiateCall = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      setMessage('❌ Please enter a phone number');
      return;
    }

    setIsLoading(true);
    setMessage('📞 Initiating call...');

    try {
      const response = await fetch('/api/retell/initiate-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Call initiated! Call ID: ${data.call_id}`);
        setPhoneNumber('');
        setShowForm(false);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.demo}>
      <div className={styles.container}>
        <h2>Experience the AI Receptionist Live</h2>
        <p className={styles.subtitle}>Call our AI demo agent and see it in action</p>

        {!isConfigured ? (
          <div className={styles.notConfigured}>
            <div className={styles.warning}>
              <p>⚙️ Retell AI is not configured yet</p>
              <p>Set up your Retell AI agent to enable live demos</p>
            </div>
            <div className={styles.instructions}>
              <h3>To enable Retell AI integration:</h3>
              <ol>
                <li>Create an agent on <a href="https://retell.cc" target="_blank" rel="noopener noreferrer">retell.cc</a></li>
                <li>Get your Agent ID from Retell dashboard</li>
                <li>Add environment variables to Vercel:
                  <code>NEXT_PUBLIC_RETELL_API_KEY</code>
                  <code>NEXT_PUBLIC_RETELL_AGENT_ID</code>
                </li>
                <li>Redeploy your site</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className={styles.demoBox}>
            <div className={styles.demoContent}>
              <div className={styles.demoIcon}>🤖</div>
              <h3>Ready to talk to our AI?</h3>
              <p>Enter your phone number and our AI receptionist will call you immediately</p>

              {showForm ? (
                <form onSubmit={handleInitiateCall} className={styles.form}>
                  <input
                    type="tel"
                    placeholder="Enter phone number (+1234567890)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isLoading}
                  />
                  <button type="submit" disabled={isLoading} className="btn btn-primary">
                    {isLoading ? '📞 Calling...' : '📞 Call Me'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary btn-lg"
                >
                  Start Demo Call
                </button>
              )}

              {message && (
                <p className={styles.message}>
                  {message}
                </p>
              )}

              <div className={styles.features}>
                <span>✓ AI answers calls</span>
                <span>✓ Books appointments</span>
                <span>✓ Answers questions</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
