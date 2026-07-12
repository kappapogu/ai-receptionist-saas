'use client';

import { useState } from 'react';
import styles from './setup.module.css';

export default function SetupPage() {
  const [webhookStatus, setWebhookStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const setupWebhook = async () => {
    setWebhookStatus('loading');
    setMessage('Setting up webhook...');

    try {
      const response = await fetch('/api/retell/setup-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        setWebhookStatus('error');
        setMessage(`❌ Error: ${data.error}`);
        console.error('Setup error:', data);
        return;
      }

      setWebhookStatus('success');
      setMessage('✅ Webhook configured successfully!');
      console.log('Webhook setup result:', data);
    } catch (error) {
      setWebhookStatus('error');
      setMessage(`❌ Error: ${error.message}`);
      console.error('Setup error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Setup Retell Webhook</h1>

        <div className={styles.info}>
          <p>
            This will configure your Retell agent to send call events and function calls to your backend.
          </p>
        </div>

        <button
          onClick={setupWebhook}
          disabled={webhookStatus === 'loading'}
          className={`${styles.button} ${styles[webhookStatus]}`}
        >
          {webhookStatus === 'loading' ? 'Setting up...' : 'Setup Webhook'}
        </button>

        {message && (
          <div className={`${styles.message} ${styles[webhookStatus]}`}>
            {message}
          </div>
        )}

        <div className={styles.details}>
          <h3>What gets configured:</h3>
          <ul>
            <li>✅ Webhook URL: https://ai-receptionist-saas-seven.vercel.app/api/retell/webhook</li>
            <li>✅ Events: call_started, call_ended, function_call</li>
            <li>✅ Functions: lookup_patient, create_patient, get_available_slots, book_appointment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
