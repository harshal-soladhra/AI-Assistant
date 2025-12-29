import React, { useState, useEffect } from 'react';
import '../CSS/Service.css';

export const Service = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:3000/api/data/service');
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }

      const data = await response.json();
      console.log('Services data:', data);
      setServices(data.msg || data.services || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-content">
          <p className="service-subtitle">Our Services</p>
          <h1 className="service-title">
            Explore Our <span className="gradient-text">Courses</span>
          </h1>
          <p className="service-description">
            Discover world-class courses taught by industry experts. Level up your skills and advance your career with our comprehensive learning programs.
          </p>
        </div>
        <div className="hero-decoration">
          <div className="decoration-circle"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          {/* Loading State */}
          {isLoading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading courses...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="error-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h3>Oops! Something went wrong</h3>
              <p>{error}</p>
              <button onClick={fetchServices} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          {/* Services Grid */}
          {!isLoading && !error && services.length > 0 && (
            <div className="services-grid">
              {services.map((service, index) => (
                <div key={service._id || index} className="service-card">
                  {/* Service Image */}
                  <div className="service-card-image">
                    <img 
                      src={getServiceImage(service.service)} 
                      alt={service.service}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="service-icon-large" style={{ display: 'none' }}>
                      {getServiceIcon(service.service)}
                    </div>
                  </div>

                  <div className="service-card-header">
                    <div className="service-badge">Popular</div>
                  </div>

                  <div className="service-card-body">
                    <h3 className="service-name">{service.service}</h3>
                    <p className="service-description">{service.description}</p>

                    <div className="service-meta">
                      <div className="meta-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{service.provider}</span>
                      </div>
                    </div>
                  </div>

                  <div className="service-card-footer">
                    <div className="service-price">
                      <span className="price-label">Price</span>
                      <span className="price-value">{service.price}</span>
                    </div>
                    <button className="enroll-btn">
                      <span>Enroll Now</span>
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && services.length === 0 && (
            <div className="empty-state">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>No courses available yet</h3>
              <p>Check back soon for new courses!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Helper function to get images based on service name
const getServiceImage = (serviceName) => {
  const name = serviceName.toLowerCase();
  
  if (name.includes('web development') && !name.includes('wordpress')) {
    return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=300&fit=crop';
  } else if (name.includes('e-commerce')) {
    return 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop';
  } else if (name.includes('responsive') || name.includes('design')) {
    return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop';
  } else if (name.includes('mobile') || name.includes('app')) {
    return 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop';
  } else if (name.includes('wordpress')) {
    return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop';
  } else if (name.includes('data') || name.includes('science')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop';
  } else if (name.includes('ui') || name.includes('ux')) {
    return 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=500&h=300&fit=crop';
  } else if (name.includes('marketing') || name.includes('digital')) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop';
  } else {
    return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop';
  }
};

// Helper function to get icons based on service name
const getServiceIcon = (serviceName) => {
  const name = serviceName.toLowerCase();
  
  if (name.includes('web') || name.includes('development')) {
    return '💻';
  } else if (name.includes('data') || name.includes('science')) {
    return '📊';
  } else if (name.includes('design') || name.includes('ui') || name.includes('ux')) {
    return '🎨';
  } else if (name.includes('marketing') || name.includes('digital')) {
    return '📱';
  } else if (name.includes('business') || name.includes('management')) {
    return '💼';
  } else if (name.includes('ai') || name.includes('machine learning')) {
    return '🤖';
  } else {
    return '📚';
  }
};