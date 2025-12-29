import React, { useState, useEffect } from 'react';
import "../CSS/Contact.css";
import { useAuth } from '../../store/auth';

export const Contact = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  // Auto-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          username: user?.username || '',
          email: user?.email || '',
          message: ''
        });
      } else {
        alert(data.msg || data.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <p className="contact-subtitle">Get In Touch</p>
          <h1 className="contact-title">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="contact-description">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle"></div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="contact-container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Email Us</h3>
              <p>Our friendly team is here to help.</p>
              <a href="mailto:info@edunova.com">info@edunova.com</a>
            </div>

            <div className="contact-info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Visit Us</h3>
              <p>Come say hello at our office.</p>
              <a href="#">123 Education Street, City, Country</a>
            </div>

            <div className="contact-info-card">
              <div className="info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Call Us</h3>
              <p>Mon-Fri from 8am to 5pm.</p>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-container">
          <div className="form-wrapper">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="username">Full Name *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                <span>{isLoading ? 'Sending...' : 'Send Message'}</span>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <div className="map-overlay">
            <div className="map-info">
              <h3>Visit Our Office</h3>
              <p>📍 123 Education Street, City, Country</p>
              <p>🕒 Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p>☎️ +1 (555) 123-4567</p>
            </div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9947869876873!2d72.5713621!3d23.0224569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="contact-container">
          <div className="section-header">
            <p className="section-subtitle">FAQ</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <h3>How quickly will I receive a response?</h3>
              <p>We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.</p>
            </div>

            <div className="faq-card">
              <h3>What courses do you offer?</h3>
              <p>We offer a wide range of courses in Web Development, Data Science, UI/UX Design, Digital Marketing, and more. Visit our courses page for details.</p>
            </div>

            <div className="faq-card">
              <h3>Do you offer refunds?</h3>
              <p>Yes, we offer a 30-day money-back guarantee on all courses. If you're not satisfied, contact us for a full refund within 30 days of purchase.</p>
            </div>

            <div className="faq-card">
              <h3>Can I get a certificate?</h3>
              <p>Yes! Upon successful completion of any course, you'll receive a verified certificate that you can share on LinkedIn and your resume.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};