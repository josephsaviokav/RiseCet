import { ArrowUp } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Main Footer Row */}
        <div className="footer-main-row">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              <div className="brand-icon">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="9" fill="#0E172E"/>
                  <path d="M10 26V10H19C21.7614 10 24 12.2386 24 15C24 17.7614 21.7614 20 19 20H15M15 20L23 26" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="10" r="2" fill="#38BDF8"/>
                  <circle cx="23" cy="26" r="2" fill="#38BDF8"/>
                  <circle cx="19" cy="20" r="2" fill="#2DD4BF"/>
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">RISECET</span>
                <span className="brand-subtitle">Embedded Intelligence</span>
              </div>
            </div>

            <p className="footer-mission">
              Where software meets the physical universe. Building autonomous systems, low-power edge neural networks, and open-source hardware.
            </p>

            <div className="footer-social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="Discord">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="X / Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-links-group">
            <div className="footer-col">
              <h4 className="footer-col-title">TRACKS</h4>
              <ul>
                <li><a href="#tracks">TinyML & Edge AI</a></li>
                <li><a href="#tracks">Embedded IoT</a></li>
                <li><a href="#tracks">Robotics & ROS 2</a></li>
                <li><a href="#tracks">Computer Vision</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">HARDWARE LAB</h4>
              <ul>
                <li><a href="#workbench">Digital Twin Workbench</a></li>
                <li><a href="#about">24+ Checkout Kits</a></li>
                <li><a href="#cadence">4-Week Build Cadence</a></li>
                <li><a href="#join">Lab Safety Orientation</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">COMMUNITY</h4>
              <ul>
                <li><a href="https://discord.gg" target="_blank" rel="noopener noreferrer">Discord Server</a></li>
                <li><a href="#projects">Project Build Logs</a></li>
                <li><a href="#resources">Starter Guides & Vault</a></li>
                <li><a href="#about">Club Manifesto</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © 2026 RISECET — Embedded Intelligence Club. Open-Source Hardware & Firmware.
          </p>

          <div className="footer-legal-links">
            <a href="#">Code of Conduct</a>
            <span>•</span>
            <a href="#">Lab Safety Manual</a>
            <span>•</span>
            <a href="#">Privacy Policy</a>
          </div>

          <button 
            className="back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
