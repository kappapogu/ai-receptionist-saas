'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './demo.module.css';

export default function DemoPage() {
  const [callStatus, setCallStatus] = useState('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [error, setError] = useState(null);
  const retellRef = useRef(null);
  const callRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Load Retell SDK from multiple CDN sources
    const loadSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/retell-client-js-sdk/lib/index.js';
      script.async = true;

      script.onload = () => {
        console.log('✅ Retell SDK loaded');
        retellRef.current = window.Retell;
      };

      script.onerror = () => {
        console.error('❌ Failed to load Retell SDK from CDN');
        // Try alternate CDN
        const altScript = document.createElement('script');
        altScript.src = 'https://unpkg.com/retell-client-js-sdk/lib/index.js';
        altScript.async = true;
        altScript.onload = () => {
          console.log('✅ Retell SDK loaded from alternate CDN');
          retellRef.current = window.Retell;
        };
        altScript.onerror = () => {
          console.error('❌ Failed to load Retell SDK from both CDNs');
        };
        document.body.appendChild(altScript);
      };

      document.body.appendChild(script);
    };

    loadSDK();

    return () => {
      if (callRef.current) {
        callRef.current.hangup();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (callStatus === 'active') {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStatus]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = async () => {
    setCallStatus('connecting');
    setError(null);

    try {
      console.log('📞 Requesting web call token...');
      const response = await fetch('/api/retell/web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start call');
      }

      console.log('✅ Got access token');

      if (!retellRef.current) {
        throw new Error('Retell SDK not loaded');
      }

      const call = retellRef.current.call;

      call.on('call_started', () => {
        console.log('✅ Call started');
        setCallStatus('active');
      });

      call.on('call_ended', () => {
        console.log('❌ Call ended');
        setCallStatus('idle');
      });

      call.on('error', (error) => {
        console.error('Call error:', error);
        setError(error.message || 'Call error occurred');
        setCallStatus('error');
      });

      await call.startCall({
        accessToken: data.access_token,
      });

      callRef.current = call;
    } catch (error) {
      setError(error.message);
      setCallStatus('error');
      console.error('Error:', error);
    }
  };

  const endCall = () => {
    if (callRef.current) {
      callRef.current.hangup();
    }
    setCallStatus('idle');
    setError(null);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Live AI Receptionist Demo</h1>
          <p className={styles.subtitle}>
            Experience a real WebRTC call with our AI
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.info}>
            <p>
              Click below to start a live WebRTC call with our AI Receptionist.
              Speak naturally - the AI will understand and respond to your requests
              in real-time.
            </p>
          </div>

          {callStatus === 'idle' || callStatus === 'error' ? (
            <div className={styles.callStart}>
              <h2>Ready for a live call?</h2>
              <p>Click below to start a real WebRTC call with your mic enabled</p>
              {error && <div style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>⚠️ {error}</div>}
              <button onClick={startCall} className={styles.startBtn} disabled={callStatus === 'connecting'}>
                {callStatus === 'connecting' ? 'Connecting...' : 'Start Live Call'}
              </button>
            </div>
          ) : (
            <div className={styles.callActive}>
              <div className={styles.callHeader}>
                <span className={styles.callStatus}>
                  {callStatus === 'connecting' && '🔄 Connecting...'}
                  {callStatus === 'active' && '🎤 Call Active'}
                </span>
              </div>

              {callStatus === 'active' && (
                <div className={styles.callTimer}>
                  <span className={styles.time}>{formatTime(callDuration)}</span>
                </div>
              )}

              <p className={styles.callInstruction}>
                {callStatus === 'connecting' && 'Connecting to AI Receptionist...'}
                {callStatus === 'active' && 'Speak freely - the AI is listening'}
              </p>

              <div className={styles.callControls}>
                <button onClick={endCall} className={styles.endBtn}>
                  End Call
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.features}>
          <h3>What You Get:</h3>
          <ul>
            <li>Real-time WebRTC voice communication</li>
            <li>Natural language understanding & responses</li>
            <li>Appointment booking & scheduling</li>
            <li>Insurance & hours inquiries</li>
            <li>24/7 availability</li>
            <li>Call transcripts & data capture</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
