import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css';
import heroImage from '../assets/1-front-img.jpg';
import secImg from '../assets/2-img.jpg';

export const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <p className="hero-subtitle">We are the World's Best E-Learning Platform</p>
            <h1 className="hero-title">
              Welcome to EduNova <span className="gradient-text">Learning</span>
            </h1>
            <p className="hero-description">
              Are you ready to take your skills to the next level with cutting-edge online education? 
              Look no further! At EduNova, we specialize in providing innovative courses and solutions 
              tailored to meet your unique learning needs.
            </p>
            <div className="hero-buttons">
              <Link
                to={localStorage.getItem("token") ? "/service" : "/register"}
                className="btn-primary"
              >
                Connect Now
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Link>

              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <div className="card-icon">📚</div>
              <p>1000+ Courses</p>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">👨‍🎓</div>
              <p>Expert Instructors</p>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">🏆</div>
              <p>Certified Learning</p>
            </div>
            <div className="hero-illustration">
              <div className="illustration-bg"></div>
              <img src={heroImage} alt="Hero Illustration" className="hero-main-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="stats-container">
          <div className="stat-box">
            <h2>50+</h2>
            <p>Registered Courses</p>
          </div>
          <div className="stat-box">
            <h2>10,000+</h2>
            <p>Happy Students</p>
          </div>
          <div className="stat-box">
            <h2>500+</h2>
            <p>Expert Instructors</p>
          </div>
          <div className="stat-box">
            <h2>24/7</h2>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <p className="section-subtitle">Why Choose Us</p>
            <h2 className="section-title">Learn From The Best Platform</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of real-world experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Learn Anywhere</h3>
              <p>Access courses on any device, anytime, anywhere at your convenience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Self-Paced Learning</h3>
              <p>Study at your own pace with lifetime access to course materials</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏅</div>
              <h3>Certification</h3>
              <p>Earn recognized certificates upon completion of courses</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Community Support</h3>
              <p>Join a vibrant community of learners and get help when needed</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Regular Updates</h3>
              <p>Course content updated regularly to match industry standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-image">
            <div className="cta-illustration">
              <div className="cta-circle"></div>
              <img src={secImg} alt="Hero Illustration" className="hero-main-image hero" />
            </div>
          </div>
          <div className="cta-content">
            <p className="cta-subtitle">We are here to help you</p>
            <h2 className="cta-title">Get Started Today</h2>
            <p className="cta-description">
              Ready to take the first step towards a more efficient and secure learning journey? 
              Contact us today for a free consultation and let's discuss how EduNova can help 
              your skills thrive in the digital age.
            </p>
            <div className="cta-buttons">
              <Link to={localStorage.getItem("token") ? "/contact" : "/register"} className="btn-primary">
                Contact Now
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Link>
              <Link to="/service" className="btn-secondary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <p className="section-subtitle">Student Success Stories</p>
            <h2 className="section-title">What Our Students Say</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "EduNova completely transformed my career. The courses are well-structured 
                and the instructors are incredibly knowledgeable!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div>
                  <h4>John Doe</h4>
                  <p>Web Developer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Best investment I've made in my education. The flexibility and quality 
                of content are unmatched!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SK</div>
                <div>
                  <h4>Sarah Kim</h4>
                  <p>Data Scientist</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "The community support and practical projects helped me land my dream job. 
                Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">MP</div>
                <div>
                  <h4>Mike Patel</h4>
                  <p>UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Stay Updated With Our Newsletter</h2>
            <p>Get the latest courses, tips, and exclusive content delivered to your inbox</p>
          </div>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button className="btn-subscribe">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};