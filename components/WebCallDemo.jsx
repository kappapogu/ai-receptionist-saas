'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './WebCallDemo.module.css';

export default function WebCallDemo() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check browser support for Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(prev => prev + transcript + ' ');
        } else {
          interim += transcript;
        }
      }
      if (interim) {
        setTranscript(prev => prev.split(' ').slice(0, -1).join(' ') + ' ' + interim);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  const handleMicClick = async () => {
    if (!phoneNumber && !isListening) {
      // First click: ask for phone number
      const userPhone = prompt('Enter your phone number to receive the call:\n(e.g., +1-415-555-1234)');
      if (!userPhone) return;
      setPhoneNumber(userPhone);
      setCallStatus('📞 Initiating call...');
      setIsCalling(true);

      try {
        const response = await fetch('/api/retell/initiate-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: userPhone }),
        });

        const data = await response.json();

        if (response.ok) {
          setCallStatus(`✅ Call initiated! You should receive a call shortly.\nCall ID: ${data.call_id}`);
          setTranscript('');
        } else {
          setCallStatus(`❌ Error: ${data.error || 'Failed to initiate call'}`);
          setPhoneNumber('');
        }
      } catch (error) {
        setCallStatus(`❌ Error: ${error.message}`);
        setPhoneNumber('');
      } finally {
        setIsCalling(false);
      }
    } else if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  if (!isSupported) {
    return (
      <section className={styles.webCall}>
        <div className={styles.container}>
          <h2>Try Our AI Receptionist</h2>
          <p className={styles.subtitle}>Browser calling not available on your device</p>
          <div className={styles.fallback}>
            <p>Call us directly instead:</p>
            <a href="tel:+14847465311" className={styles.phoneLink}>
              📞 +1 (484) 746-5311
            </a>
            <p className={styles.subtext}>24/7 live AI - call anytime</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.webCall}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>TRY IN BROWSER • NO SIGNUP</span>
        </div>

        <div className={styles.content}>
          <div className={styles.agentInfo}>
            <div className={styles.avatar}>🤖</div>
            <div className={styles.agentDetails}>
              <h3>AI Receptionist</h3>
              <p>English</p>
            </div>
          </div>

          <div className={styles.micContainer}>
            <button
              className={`${styles.micButton} ${isListening ? styles.active : ''} ${isCalling ? styles.calling : ''}`}
              onClick={handleMicClick}
              disabled={isCalling}
              title={isCalling ? 'Initiating call...' : isListening ? 'Stop listening' : 'Click to call'}
            >
              <span className={styles.micIcon}>{isCalling ? '📞' : '🎤'}</span>
            </button>
            <p className={styles.instruction}>
              {isCalling ? 'Calling...' : isListening ? 'Listening...' : 'Click to start a conversation'}
            </p>
          </div>

          {callStatus && (
            <div className={styles.statusBox}>
              <p className={styles.statusText}>{callStatus}</p>
            </div>
          )}

          {transcript && (
            <div className={styles.transcriptBox}>
              <p className={styles.transcriptLabel}>You said:</p>
              <p className={styles.transcriptText}>{transcript}</p>
            </div>
          )}

          <div className={styles.divider}></div>

          <div className={styles.phoneSection}>
            <p className={styles.label}>Call our AI assistant</p>
            <a href="tel:+14847465311" className={styles.phoneNumber}>
              📞 +1 (484) 746-5311
            </a>
            <p className={styles.subtext}>24/7 live AI - call anytime</p>
          </div>

          <p className={styles.footer}>
            {isListening ? 'Speak clearly and we\'ll process your message.' : 'Click the mic. Talk to our AI for 60s.'}
          </p>
        </div>
      </div>
    </section>
  );
}
