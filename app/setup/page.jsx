'use client';

import { useState } from 'react';
import styles from './setup.module.css';

export default function SetupPage() {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const webhookUrl = 'https://ai-receptionist-saas-seven.vercel.app/api/retell/webhook';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Configure Retell Webhook</h1>

        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3>Go to Retell Dashboard</h3>
              <p>Visit <strong>https://retellai.com/dashboard</strong></p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3>Select Your Agent</h3>
              <p>Click on agent: <span className={styles.code}>agent_4b8c2c11131f8aa25b7d65e458</span></p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3>Open Agent Settings</h3>
              <p>Go to <strong>Settings → Webhook</strong></p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h3>Add Webhook URL</h3>
              <div className={styles.urlBox}>
                <span className={styles.code}>{webhookUrl}</span>
                <button
                  onClick={() => copyToClipboard(webhookUrl, 'url')}
                  className={styles.copyBtn}
                >
                  {copied === 'url' ? '✅ Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>5</div>
            <div className={styles.stepContent}>
              <h3>Enable Webhook Events</h3>
              <div className={styles.checkboxList}>
                <label>
                  <input type="checkbox" checked disabled /> call_started
                </label>
                <label>
                  <input type="checkbox" checked disabled /> call_ended
                </label>
                <label>
                  <input type="checkbox" checked disabled /> function_call
                </label>
              </div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>6</div>
            <div className={styles.stepContent}>
              <h3>Save and Test</h3>
              <p>Click <strong>Save</strong>, then click <strong>Test</strong> to verify the webhook works</p>
            </div>
          </div>
        </div>

        <div className={styles.success}>
          <h3>✅ What Happens After</h3>
          <ul>
            <li>Your AI agent can now look up patient information</li>
            <li>Create new patient records</li>
            <li>Check available appointment times</li>
            <li>Book appointments automatically</li>
            <li>Log all call events</li>
          </ul>
        </div>

        <div className={styles.test}>
          <h3>🧪 Test Your Setup</h3>
          <p>After configuring the webhook:</p>
          <ol>
            <li>Go to <a href="/call" className={styles.link}>/call</a></li>
            <li>Click the microphone button</li>
            <li>Make a test call</li>
            <li>Check Retell dashboard for webhook events</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
