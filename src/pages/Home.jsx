import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="hero-section">
      <div className="hero-glass">
        <div className="hero-copy">
          <p className="eyebrow">Government Services</p>
          <h1>Passport Automation System</h1>
          <p>Secure, fast and organized passport applications with live tracking and admin approval workflow.</p>
          <div className="hero-actions">
            <Link to="/apply" className="button primary">Apply Now</Link>
            <Link to="/track" className="button secondary">Track Status</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="passport-icon">
            <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="10" width="90" height="100" rx="8" fill="#1e3a5f" stroke="#38bdf8" strokeWidth="2"/>
              <rect x="10" y="20" width="80" height="70" rx="4" fill="#0f2744"/>
              <circle cx="50" cy="45" r="15" stroke="#38bdf8" strokeWidth="2" fill="none"/>
              <path d="M35 55 Q50 65 65 55" stroke="#38bdf8" strokeWidth="2" fill="none"/>
              <rect x="25" y="30" width="50" height="8" rx="2" fill="#38bdf8" opacity="0.3"/>
              <rect x="25" y="42" width="40" height="6" rx="2" fill="#38bdf8" opacity="0.2"/>
              <rect x="25" y="52" width="45" height="6" rx="2" fill="#38bdf8" opacity="0.2"/>
              <rect x="25" y="62" width="35" height="6" rx="2" fill="#38bdf8" opacity="0.2"/>
              <text x="50" y="95" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="sans-serif">PASSPORT</text>
            </svg>
          </div>
        </div>
        <div className="hero-summary">
          <div className="summary-card">
            <h3>Zero Paperwork</h3>
            <p>Upload documents securely and submit your application online.</p>
          </div>
          <div className="summary-card">
            <h3>Real-Time Updates</h3>
            <p>Receive status notifications for approval or any missing details.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
