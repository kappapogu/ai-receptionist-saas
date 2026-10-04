'use client';

import { useState } from 'react';
import styles from './demo.module.css';

export default function DemoPage() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState('idle');

  const startCall = async () => {
    setCallStatus('connecting');
    setMessages([]);
    setInput('');

    try {
      // Simulate API call start
      const newSessionId = 'session_' + Date.now();
      setSessionId(newSessionId);
      setCallStatus('active');

      // Add system message
      setMessages([
        {
          role: 'system',
          text: 'Incoming call from patient. AI Receptionist answering...',
        },
        {
          role: 'agent',
          text: 'Hello! Thank you for calling our office. How can I help you today?',
        },
      ]);
    } catch (error) {
      setCallStatus('error');
      console.error('Error starting call:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'caller', text: userMessage }]);
    setIsLoading(true);

    try {
      // Simulate AI response
      setTimeout(() => {
        const responses = {
          'book': 'I can help you book an appointment. What service would you like to schedule?',
          'reschedule':
            'No problem, I can reschedule for you. What date and time work best?',
          'cancel':
            'I understand. I can cancel your appointment. Which appointment would you like to cancel?',
          'hours':
            'We are open Monday to Friday, 8 AM to 6 PM, and Saturday 9 AM to 2 PM.',
          'insurance':
            'Yes, we accept most major insurance plans including Delta Dental. Let me check your coverage.',
          'emergency':
            'I understand this is urgent. Please call our emergency line immediately at 911 or visit the nearest emergency room.',
          'default':
            "I understand. Let me help you with that. Could you provide more details?",
        };

        let agentResponse = responses.default;
        if (userMessage.toLowerCase().includes('book'))
          agentResponse = responses.book;
        else if (userMessage.toLowerCase().includes('reschedule'))
          agentResponse = responses.reschedule;
        else if (userMessage.toLowerCase().includes('cancel'))
          agentResponse = responses.cancel;
        else if (
          userMessage.toLowerCase().includes('hour') ||
          userMessage.toLowerCase().includes('open')
        )
          agentResponse = responses.hours;
        else if (userMessage.toLowerCase().includes('insurance'))
          agentResponse = responses.insurance;
        else if (userMessage.toLowerCase().includes('emergency'))
          agentResponse = responses.emergency;

        setMessages((prev) => [...prev, { role: 'agent', text: agentResponse }]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const quickReply = (text) => {
    setInput(text);
  };

  const endCall = () => {
    setSessionId(null);
    setMessages([]);
    setCallStatus('idle');
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Interactive Call Demo</h1>
          <p className={styles.subtitle}>
            Experience our AI Receptionist in action
          </p>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.info}>
            <p>
              This is an interactive simulation of how our AI Receptionist
              handles patient calls. Try asking about appointments, hours,
              insurance, or other common requests.
            </p>
          </div>

          {!sessionId ? (
            <div className={styles.callStart}>
              <h2>Ready to see it in action?</h2>
              <p>Click below to simulate an incoming call</p>
              <button onClick={startCall} className={styles.startBtn}>
                Start Demo Call
              </button>
            </div>
          ) : (
            <>
              <div className={styles.chatContainer}>
                <div className={styles.chat}>
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`${styles.message} ${styles[msg.role]}`}
                    >
                      <div className={styles.bubble}>{msg.text}</div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className={`${styles.message} ${styles.agent}`}>
                      <div className={styles.bubble}>
                        <span className={styles.typing}>...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={sendMessage} className={styles.form}>
                <input
                  type="text"
                  placeholder="Type what the caller says..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className={styles.input}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={styles.sendBtn}
                >
                  Send
                </button>
              </form>

              <div className={styles.quickReplies}>
                <button
                  type="button"
                  onClick={() => quickReply("I'd like to book an appointment")}
                  className={styles.quickBtn}
                >
                  Book Appointment
                </button>
                <button
                  type="button"
                  onClick={() => quickReply('I need to reschedule')}
                  className={styles.quickBtn}
                >
                  Reschedule
                </button>
                <button
                  type="button"
                  onClick={() => quickReply('What are your hours?')}
                  className={styles.quickBtn}
                >
                  Ask Hours
                </button>
                <button
                  type="button"
                  onClick={() => quickReply('Do you accept insurance?')}
                  className={styles.quickBtn}
                >
                  Insurance
                </button>
                <button
                  type="button"
                  onClick={() => quickReply('I need to cancel')}
                  className={styles.quickBtn}
                >
                  Cancel
                </button>
              </div>

              <button onClick={endCall} className={styles.endBtn}>
                End Call
              </button>
            </>
          )}
        </div>

        <div className={styles.features}>
          <h3>What You're Experiencing:</h3>
          <ul>
            <li>
              Natural language understanding of patient requests and questions
            </li>
            <li>
              Intelligent appointment booking, rescheduling, and cancellation
            </li>
            <li>Answers to common questions about hours and services</li>
            <li>
              Professional, empathetic responses for every patient interaction
            </li>
            <li>24/7 availability without additional staff</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
