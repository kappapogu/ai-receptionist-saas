'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './call.module.css';

export default function CallAgent() {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('idle');
  const [callId, setCallId] = useState(null);
  const retellRef = useRef(null);
  const callRef = useRef(null);

  useEffect(() => {
    // Load Retell SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/retell-client-js-sdk@latest/lib/index.js';
    script.onload = () => {
      console.log('Retell SDK loaded');
      retellRef.current = window.Retell;
    };
    document.body.appendChild(script);

    return () => {
      if (callRef.current) {
        callRef.current.hangup();
      }
    };
  }, []);

  const handleMicClick = async () => {
    if (status === 'active') {
      callRef.current?.hangup();
      setStatus('idle');
      setIsListening(false);
      return;
    }

    setStatus('connecting');

    try {
      // Get web call token from backend
      console.log('📞 Requesting web call token...');
      const response = await fetch('/api/retell/web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        setStatus('error');
        console.error('❌ Web call error:', {
          status: response.status,
          error: data.error,
          details: data.details,
        });
        return;
      }

      console.log('✅ Got access token:', data.access_token?.substring(0, 20) + '...');

      // Initialize Retell call
      if (!retellRef.current) {
        setStatus('error');
        console.error('Retell SDK not loaded');
        return;
      }

      const call = retellRef.current.call;

      // Set up event listeners
      call.on('call_started', () => {
        console.log('✅ Call started');
        setStatus('active');
        setIsListening(true);
        setCallId(data.call_id);
      });

      call.on('call_ended', () => {
        console.log('❌ Call ended');
        setStatus('idle');
        setIsListening(false);
      });

      call.on('error', (error) => {
        console.error('Call error:', error);
        setStatus('error');
      });

      // Start call with access token
      await call.startCall({
        accessToken: data.access_token,
      });

      callRef.current = call;
    } catch (error) {
      setStatus('error');
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.outer}>
        <div className={styles.badge}>TRY IN BROWSER • NO SIGNUP</div>

        <div className={styles.inner}>
          <div className={styles.agentBar}>
            <span className={styles.avatar}>👩‍💼</span>
            <span className={styles.agentName}>AI Receptionist</span>
            <span className={styles.language}>English</span>
          </div>

          <div className={styles.micSection}>
            <button
              className={`${styles.micButton} ${isListening ? styles.listening : ''} ${status === 'connecting' ? styles.calling : ''} ${status === 'error' ? styles.error : ''}`}
              onClick={handleMicClick}
              disabled={status === 'connecting'}
            >
              <span className={styles.micIcon}>🎤</span>
            </button>
            <p className={styles.instruction}>
              {status === 'connecting' && 'Connecting...'}
              {status === 'active' && (isListening ? 'Listening...' : 'Click mic to talk')}
              {status === 'error' && 'Error. Try again.'}
              {status === 'idle' && 'Click to start a conversation'}
            </p>
          </div>

          {callId && (
            <div className={styles.callInfo}>
              <p>Call ID: {callId}</p>
            </div>
          )}

          <div className={styles.divider}></div>

          <div className={styles.phoneSection}>
            <p className={styles.phoneLabel}>Call our AI receptionist</p>
            <a href="tel:+14847465311" className={styles.phoneLink}>
              📞 +1 (484) 746-5311
            </a>
            <p className={styles.phoneSub}>24/7 live AI - call anytime</p>
          </div>

          <p className={styles.footer}>Click the mic. Talk to our AI for 60s.</p>
        </div>
      </div>
    </div>
  );
}
