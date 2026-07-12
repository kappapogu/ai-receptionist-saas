'use client';

import { useState } from 'react';
import styles from './test-agent.module.css';

export default function TestAgent() {
  const [status, setStatus] = useState('Ready to test');
  const [callId, setCallId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInitiateCall = async () => {
    setIsLoading(true);
    setStatus('Initiating call to +1-484-746-5311...');

    try {
      const response = await fetch('/api/retell/initiate-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: '+14847465311' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(`❌ Error: ${data.error || 'Failed to initiate call'}`);
        console.error('API Error:', data);
        return;
      }

      setCallId(data.call_id);
      setStatus(`✅ Call initiated! ID: ${data.call_id}`);
      console.log('Call Response:', data);
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
      console.error('Call Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Retell Agent Test</h1>

        <div className={styles.infoBox}>
          <p><strong>Phone Number:</strong> +1-484-746-5311</p>
          <p><strong>Agent ID:</strong> {process.env.NEXT_PUBLIC_RETELL_AGENT_ID || 'Not configured'}</p>
        </div>

        <button
          onClick={handleInitiateCall}
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? 'Initiating...' : 'Test Call'}
        </button>

        <div className={styles.statusBox}>
          <p><strong>Status:</strong></p>
          <p className={styles.statusText}>{status}</p>
        </div>

        {callId && (
          <div className={styles.successBox}>
            <p>✅ Call initiated successfully!</p>
            <p><strong>Call ID:</strong> {callId}</p>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '1rem' }}>
              Check the browser console (F12) for detailed logs.
            </p>
          </div>
        )}

        <div className={styles.instructions}>
          <h3>Instructions:</h3>
          <ol>
            <li>Click "Test Call" button</li>
            <li>The system will attempt to initiate a call to +1-484-746-5311</li>
            <li>Check the status box for results</li>
            <li>Open browser console (F12) to see detailed API responses</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
