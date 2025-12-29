import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/ErrorPage.css';

export const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        {/* Animated Background */}
        <div className="error-bg">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>

        {/* Error Content */}
        <div className="error-content">
          {/* 404 Number */}
          <div className="error-number">
            <span className="number-4">4</span>
            <span className="number-0">
              <svg viewBox="0 0 200 200" className="zero-svg">
                <circle cx="100" cy="100" r="80" fill="none" stroke="url(#gradient404)" strokeWidth="8" strokeDasharray="502" strokeDashoffset="502" className="circle-animate"/>
                <defs>
                  <linearGradient id="gradient404" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F5FF"/>
                    <stop offset="100%" stopColor="#6366F1"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="number-4">4</span>
          </div>

          {/* Error Message */}
          <h1 className="error-title">Page Not Found</h1>
          <p className="error-description">
            Oops! The page you're looking for seems to have gone on a learning break. 
            Let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="error-actions">
            <Link to="/" className="btn-home">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back to Home</span>
            </Link>
            <Link to="/service" className="btn-courses">
              <span>Browse Courses</span>
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="popular-links">
            <p className="links-title">Popular Pages</p>
            <div className="links-grid">
              <Link to="/" className="quick-link">
                <span className="link-icon">🏠</span>
                <span>Home</span>
              </Link>
              <Link to="/about" className="quick-link">
                <span className="link-icon">✨</span>
                <span>About Us</span>
              </Link>
              <Link to="/service" className="quick-link">
                <span className="link-icon">📚</span>
                <span>Courses</span>
              </Link>
              <Link to="/contact" className="quick-link">
                <span className="link-icon">💬</span>
                <span>Contact</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Robot/Character */}
        <div className="error-illustration">
          <div className="robot">
            <div className="robot-head">
              <div className="robot-antenna"></div>
              <div className="robot-eyes">
                <div className="eye left-eye"></div>
                <div className="eye right-eye"></div>
              </div>
              <div className="robot-mouth"></div>
            </div>
            <div className="robot-body">
              <div className="body-light"></div>
            </div>
            <div className="robot-arms">
              <div className="arm left-arm"></div>
              <div className="arm right-arm"></div>
            </div>
          </div>
          <p className="robot-text">Searching for page...</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;