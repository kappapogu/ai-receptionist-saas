'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './call.module.css';

export default function CallAgent() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
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

    recognitionRef.current = recognition;
    return () => recognition.abort();
  }, []);

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    setTranscript('');
    recognitionRef.current?.start();
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
              className={`${styles.micButton} ${isListening ? styles.listening : ''}`}
              onClick={handleMicClick}
            >
              <span className={styles.micIcon}>🎤</span>
            </button>
            <p className={styles.instruction}>
              {isListening ? 'Listening...' : 'Click to start a conversation'}
            </p>
          </div>

          {transcript && (
            <div className={styles.transcriptBox}>
              <p className={styles.transcriptText}>{transcript}</p>
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
