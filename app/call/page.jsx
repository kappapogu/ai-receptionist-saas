'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './call.module.css';

export default function CallAgent() {
  const [callStatus, setCallStatus] = useState('idle');
  const [callId, setCallId] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const callTimeRef = useRef(0);
  const callTimerRef = useRef(null);

  useEffect(() => {
    // Initialize Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setCallStatus('error');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript + ' ');
        } else {
          interim += transcript;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error);
      if (event.error !== 'no-speech') {
        setCallStatus('error');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  const initiateCall = async () => {
    setCallStatus('connecting');
    setTranscript('');

    try {
      const response = await fetch('/api/retell/initiate-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: '+14847465311' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setCallStatus('error');
        console.error('Call error:', data);
        return;
      }

      setCallId(data.call_id);
      setCallStatus('active');

      // Start timer
      callTimeRef.current = 0;
      callTimerRef.current = setInterval(() => {
        callTimeRef.current += 1;
      }, 1000);

      // Start listening
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      setCallStatus('error');
      console.error('Error:', error);
    }
  };

  const endCall = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }
    setCallStatus('idle');
    setCallId(null);
    setTranscript('');
    setIsListening(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (callStatus === 'error') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Browser Not Supported</h1>
          <p className={styles.errorText}>
            Your browser doesn't support voice calling. Please use Chrome, Edge, or Firefox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {callStatus === 'idle' ? (
          <>
            <h1 className={styles.title}>Call AI Receptionist</h1>
            <div className={styles.agentInfo}>
              <span className={styles.avatar}>📞</span>
              <p className={styles.subtitle}>Talk directly in your browser</p>
            </div>
            <button onClick={initiateCall} className={styles.callButton}>
              Start Call
            </button>
            <p className={styles.hint}>Click to begin • Speak naturally • Browser-based</p>
          </>
        ) : (
          <>
            <div className={styles.callHeader}>
              <h2 className={styles.callTitle}>In Call</h2>
              <span className={styles.callTimer}>{formatTime(callTimeRef.current)}</span>
            </div>

            <div className={styles.micButton + (isListening ? ' ' + styles.listening : '')}>
              <span className={styles.micIcon}>🎤</span>
              <p className={styles.micStatus}>
                {isListening ? 'Listening...' : 'Waiting...'}
              </p>
            </div>

            {transcript && (
              <div className={styles.transcriptBox}>
                <p className={styles.transcriptLabel}>You said:</p>
                <p className={styles.transcriptText}>{transcript}</p>
              </div>
            )}

            <button onClick={endCall} className={styles.endCallButton}>
              End Call
            </button>

            {callId && (
              <p className={styles.callId}>Call ID: {callId}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
