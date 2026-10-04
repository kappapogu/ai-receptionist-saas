'use client';

import { useState } from 'react';
import styles from './professional.module.css';

export default function ProfessionalPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>ReceptAI Pro</div>
          <nav className={styles.nav}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="/call" className={styles.demo}>Book Demo</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            AI Receptionist for Dental & Medical Spas
          </h1>
          <p className={styles.heroSubtitle}>
            Automate your front desk with intelligent voice AI. Answer calls, book appointments, and manage patient inquiries 24/7 without hiring additional staff.
          </p>
          <div className={styles.heroCTA}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.submitBtn}>
                {submitted ? 'Email Sent' : 'Get Started Free'}
              </button>
            </form>
          </div>
          <p className={styles.subtext}>No credit card required. 14-day free trial.</p>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.imagePlaceholder}>
            High-Quality Hero Image
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Powerful Features Built for Healthcare</h2>
          <p>Everything you need to streamline patient communication</p>
        </div>

        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <h3>24/7 Call Handling</h3>
            <p>Answer incoming calls instantly, even after hours. Never miss a patient inquiry.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>Intelligent Scheduling</h3>
            <p>Check availability, book appointments, and manage calendar directly through voice.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>Patient Recognition</h3>
            <p>Recognize returning patients and access their information automatically.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>Natural Conversations</h3>
            <p>Advanced AI that sounds human. Handles complex patient requests naturally.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>Seamless Integration</h3>
            <p>Connects with your existing practice management system effortlessly.</p>
          </div>

          <div className={styles.featureCard}>
            <h3>Analytics & Insights</h3>
            <p>Track call volume, conversion rates, and patient sentiment in real-time.</p>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className={styles.industries}>
        <div className={styles.sectionHeader}>
          <h2>Purpose-Built for Your Industry</h2>
        </div>

        <div className={styles.industriesGrid}>
          <div className={styles.industryCard}>
            <div className={styles.industryImage}></div>
            <h3>Dental Practices</h3>
            <ul>
              <li>Appointment scheduling</li>
              <li>Insurance verification</li>
              <li>Treatment reminders</li>
              <li>Follow-up care</li>
            </ul>
          </div>

          <div className={styles.industryCard}>
            <div className={styles.industryImage}></div>
            <h3>Medical Spas</h3>
            <ul>
              <li>Service inquiries</li>
              <li>Booking consultations</li>
              <li>Payment processing</li>
              <li>Membership management</li>
            </ul>
          </div>

          <div className={styles.industryCard}>
            <div className={styles.industryImage}></div>
            <h3>Aesthetic Clinics</h3>
            <ul>
              <li>Treatment options</li>
              <li>Price inquiries</li>
              <li>Follow-up scheduling</li>
              <li>Lead qualification</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.stat}>
          <h3>98%</h3>
          <p>Call Answer Rate</p>
        </div>
        <div className={styles.stat}>
          <h3>45%</h3>
          <p>Increase in Bookings</p>
        </div>
        <div className={styles.stat}>
          <h3>24/7</h3>
          <p>Availability</p>
        </div>
        <div className={styles.stat}>
          <h3>60%</h3>
          <p>Cost Reduction</p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2>Trusted by Healthcare Professionals</h2>
        </div>

        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.stars}>★★★★★</div>
            <p>"ReceptAI has transformed how we manage patient calls. We have reduced missed appointments by 35%."</p>
            <div className={styles.author}>
              <div className={styles.authorImage}></div>
              <div>
                <strong>Dr. Sarah Mitchell</strong>
                <p>Dental Clinic, New York</p>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.stars}>★★★★★</div>
            <p>"The AI receptionist handles complex queries about our treatments perfectly. Our staff can focus on clients now."</p>
            <div className={styles.author}>
              <div className={styles.authorImage}></div>
              <div>
                <strong>Jennifer Lee</strong>
                <p>MedSpa Director, Los Angeles</p>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.stars}>★★★★★</div>
            <p>"Best investment we made this year. The ROI was apparent within the first month of implementation."</p>
            <div className={styles.author}>
              <div className={styles.authorImage}></div>
              <div>
                <strong>Dr. Marcus Chen</strong>
                <p>Aesthetic Center, San Francisco</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.sectionHeader}>
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that fits your practice</p>
        </div>

        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <h3>Starter</h3>
            <div className={styles.price}>
              <span className={styles.amount}>$299</span>
              <span className={styles.period}>/month</span>
            </div>
            <ul className={styles.features}>
              <li>Up to 500 calls/month</li>
              <li>Basic scheduling</li>
              <li>Email support</li>
              <li>1 phone number</li>
            </ul>
            <button className={styles.priceButton}>Get Started</button>
          </div>

          <div className={`${styles.pricingCard} ${styles.featured}`}>
            <div className={styles.badge}>MOST POPULAR</div>
            <h3>Professional</h3>
            <div className={styles.price}>
              <span className={styles.amount}>$799</span>
              <span className={styles.period}>/month</span>
            </div>
            <ul className={styles.features}>
              <li>Unlimited calls</li>
              <li>Advanced scheduling</li>
              <li>Priority support</li>
              <li>Up to 5 phone numbers</li>
              <li>Analytics dashboard</li>
              <li>Custom workflows</li>
            </ul>
            <button className={styles.priceButton}>Get Started</button>
          </div>

          <div className={styles.pricingCard}>
            <h3>Enterprise</h3>
            <div className={styles.price}>
              <span className={styles.contact}>Custom</span>
            </div>
            <ul className={styles.features}>
              <li>Everything in Professional</li>
              <li>Dedicated account manager</li>
              <li>Custom integrations</li>
              <li>White-label options</li>
              <li>SLA guarantees</li>
            </ul>
            <button className={styles.priceButton}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className={styles.cta}>
        <h2>Ready to Transform Your Patient Experience?</h2>
        <p>Join hundreds of healthcare professionals using ReceptAI</p>
        <a href="/call" className={styles.ctaButton}>Start Your Free Trial</a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>ReceptAI Pro</h4>
            <p>AI Receptionist for Healthcare Providers</p>
          </div>
          <div className={styles.footerSection}>
            <h5>Product</h5>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="/call">Demo</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h5>Company</h5>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 ReceptAI Pro. All rights reserved.</p>
          <p>HIPAA Compliant | SOC 2 Certified</p>
        </div>
      </footer>
    </div>
  );
}
