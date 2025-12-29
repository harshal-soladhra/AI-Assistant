import React from "react";
import "../CSS/About.css";

export const About = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-subtitle">Who We Are</p>
          <h1 className="about-title">
            Empowering <span className="gradient-text">Developers</span> & Learners
          </h1>
          <p className="about-description">
            We build modern collaboration tools that help developers, students,
            and teams write, share, and learn code together in real time.
          </p>
        </div>
        <div className="hero-glow"></div>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-content">
        <div className="about-container">
          <div className="about-grid">
            <div className="about-card">
              <h3>Our Mission</h3>
              <p>
                Our mission is to simplify real-time collaboration and make
                learning and sharing code accessible, fast, and enjoyable for
                everyone.
              </p>
            </div>

            <div className="about-card">
              <h3>Our Vision</h3>
              <p>
                We envision a world where developers and learners can collaborate
                seamlessly, regardless of location, tools, or experience level.
              </p>
            </div>

            <div className="about-card">
              <h3>What We Build</h3>
              <p>
                A secure, real-time platform designed for coding sessions,
                classrooms, interviews, pair programming, and teamwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="about-stats">
        <div className="stats-container">
          <div className="stat-box">
            <h2>10K+</h2>
            <p>Active Users</p>
          </div>
          <div className="stat-box">
            <h2>50K+</h2>
            <p>Code Sessions</p>
          </div>
          <div className="stat-box">
            <h2>100+</h2>
            <p>Languages Supported</p>
          </div>
          <div className="stat-box">
            <h2>99.9%</h2>
            <p>Uptime</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <div className="about-container">
          <div className="section-header">
            <p className="section-subtitle">Why Choose Us</p>
            <h2 className="section-title">Built for Modern Collaboration</h2>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <h4>Real-Time Sync</h4>
              <p>
                Every keystroke updates instantly for all participants with
                minimal latency.
              </p>
            </div>

            <div className="why-card">
              <h4>Secure by Design</h4>
              <p>
                Your data and rooms are protected with encryption and privacy
                controls.
              </p>
            </div>

            <div className="why-card">
              <h4>Developer Friendly</h4>
              <p>
                Clean UI, fast performance, and workflows designed by developers
                for developers.
              </p>
            </div>

            <div className="why-card">
              <h4>Scalable Platform</h4>
              <p>
                From solo learners to large teams, our platform scales with your
                needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="values">
        <div className="about-container">
          <div className="values-box">
            <h2>Our Core Values</h2>
            <ul>
              <li>🚀 Innovation-driven development</li>
              <li>🔒 Privacy and security first</li>
              <li>🤝 Collaboration over competition</li>
              <li>📚 Learning without barriers</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
};
