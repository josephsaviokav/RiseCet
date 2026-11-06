import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, MessageSquare, Terminal } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll listener for sticky backdrop
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    // GSAP entrance animation using gsap.fromTo()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  return (
    <header ref={navRef} className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <a href="#" className="nav-brand">
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
        </a>

        {/* Center Navigation Links */}
        <nav className={`nav-links ${mobileMenuOpen ? 'nav-links--open' : ''}`}>
          <a href="#tracks" onClick={() => setMobileMenuOpen(false)}>Tracks</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#workbench" onClick={() => setMobileMenuOpen(false)}>Workbench</a>
          <a href="#cadence" onClick={() => setMobileMenuOpen(false)}>Process</a>
          <a href="#community" onClick={() => setMobileMenuOpen(false)}>Community</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
        </nav>

        {/* Right CTA Actions */}
        <div className="nav-actions">
          <a 
            href="https://discord.gg" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-discord-link"
          >
            <MessageSquare size={16} />
            <span>Discord</span>
          </a>
          <a href="#join" className="btn-primary-teal nav-btn-join">
            <span>Join the Club</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className={`mobile-toggle ${mobileMenuOpen ? 'mobile-toggle--active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
