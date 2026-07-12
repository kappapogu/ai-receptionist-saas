'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './call.module.css';

export default function CallAgent() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('idle');
  const [callId, setCallId] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const trans = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + trans + ' ');
        } else {
          interim += trans;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
    };

    recognitionRef.current = recognition;
    return () => recognition.abort();
  }, []);

  const handleMicClick = async () => {
    if (status === 'active') {
      if (isListening) {
        recognitionRef.current?.stop();
      }
      return;
    }

    setStatus('connecting');
    setTranscript('');
    setCallId(null);

    try {
      // Start listening for user voice input
      recognitionRef.current?.start();

      // Brief delay then mark as active
      setTimeout(() => {
        setStatus('active');
        setCallId('local-' + Date.now());
      }, 500);

      console.log('Browser voice input started');
    } catch (error) {
      setStatus('error');
      setTranscript(`Microphone error: ${error.message}`);
      console.error('Microphone error:', error);
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
              {status === 'connecting' && 'Connecting to agent...'}
              {status === 'active' && (isListening ? 'Listening...' : 'Click mic to start talking')}
              {status === 'error' && 'Error connecting. Try again.'}
              {status === 'idle' && 'Click to start a conversation'}
            </p>
          </div>

          {transcript && (
            <div className={styles.transcriptBox}>
              <p className={styles.transcriptLabel}>You:</p>
              <p className={styles.transcriptText}>{transcript}</p>
            </div>
          )}

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
