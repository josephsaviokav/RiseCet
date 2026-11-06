import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Sparkles, Send, ShieldCheck } from 'lucide-react';
import './CTA.css';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const formCardRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    track: 'tinyml',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left side entrance
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form card entrance
      gsap.fromTo(
        formCardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitted(true);

    // GSAP success bounce animation
    gsap.fromTo(
      '.form-success-box',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
    );
  };

  return (
    <section ref={sectionRef} className="cta-join-section" id="join">
      <div className="container cta-join-container">
        {/* Left Content */}
        <div ref={leftColRef} className="cta-join-left">
          <div className="cta-badge">GET INVOLVED // 2026 COHORT</div>
          <h2 className="cta-join-heading">
            Bring your curiosity.<br />
            Let's build<br />
            <span>what's next.</span>
          </h2>
          <p className="cta-join-desc">
            Join 200+ students building on the frontier of physical computing, robotics, and edge intelligence. No hardware experience required.
          </p>

          <div className="cta-perks-list">
            <div className="perk-item">
              <span className="perk-check"><Check size={14} /></span>
              <span>Full weekly lab access & equipment workbench</span>
            </div>
            <div className="perk-item">
              <span className="perk-check"><Check size={14} /></span>
              <span>Hardware kit checkout (ESP32-S3, STM32, Sensors)</span>
            </div>
            <div className="perk-item">
              <span className="perk-check"><Check size={14} /></span>
              <span>1-on-1 mentorship from experienced senior makers</span>
            </div>
            <div className="perk-item">
              <span className="perk-check"><Check size={14} /></span>
              <span>End-of-semester Demo Day & showcase exhibition</span>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div ref={formCardRef} className="cta-form-card">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="join-form">
              <h3 className="form-card-title">Make the first connection.</h3>
              <p className="form-card-subtitle">
                Fill in your details to receive an invitation to our next onboarding lab sprint.
              </p>

              <div className="form-field">
                <label htmlFor="fullname">Your Full Name</label>
                <input 
                  type="text" 
                  id="fullname"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">College Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  placeholder="alex@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-field">
                <label htmlFor="track">What interests you most?</label>
                <select 
                  id="track"
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                >
                  <option value="tinyml">TinyML & Edge AI</option>
                  <option value="iot">Embedded IoT & Wireless Mesh</option>
                  <option value="robotics">Autonomous Robotics & ROS 2</option>
                  <option value="vision">Computer Vision & Edge Cameras</option>
                  <option value="all">Not sure yet — I want to explore!</option>
                </select>
              </div>

              <button type="submit" className="form-submit-btn">
                <span>Request Lab Access</span>
                <ArrowRight size={16} />
              </button>

              <div className="form-guarantee">
                <ShieldCheck size={14} />
                <span>Zero fees • All hardware provided • Open to all years</span>
              </div>
            </form>
          ) : (
            <div className="form-success-box">
              <div className="success-icon-wrap">
                <Sparkles size={32} />
              </div>
              <h3 className="success-title">Welcome to the Club!</h3>
              <p className="success-desc">
                Thanks, <strong>{formData.name}</strong>! We've sent an onboarding package and Discord invite link to <strong>{formData.email}</strong>.
              </p>
              <div className="success-next-step">
                <span>Next Step: </span>
                Join our Discord server and introduce yourself in <code>#introductions</code>!
              </div>
              <button 
                className="btn-secondary-white success-reset-btn"
                onClick={() => setSubmitted(false)}
              >
                Submit another response
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
