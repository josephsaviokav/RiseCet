import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronRight, Activity, Box, Image as ImageIcon, Sparkles } from 'lucide-react';
import heroBoardImg from '../../assets/extracted/hero-board.png';
import ArduinoCanvas from '../3D/ArduinoCanvas';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const metaRef = useRef(null);
  const visualWrapperRef = useRef(null);

  // Toggle between 3D Interactive Model and 2D Spec Illustration
  const [viewMode, setViewMode] = useState('3d'); // '3d' or '2d'

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline for hero entrance
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
      .fromTo(
        '.hero-title-line',
        { opacity: 0, y: 40, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.35'
      )
      .fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(
        visualWrapperRef.current,
        { opacity: 0, x: 50, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 1.0, ease: 'power3.out' },
        '-=0.9'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-grid-bg"></div>

      <div className="container hero-container">
        {/* Left Column: Typography & CTAs */}
        <div className="hero-content">
          <div ref={badgeRef} className="hero-tag">
            <span className="hero-tag-pulse"></span>
            <span>RISECET // EMBEDDED INTELLIGENCE CLUB</span>
          </div>

          <h1 ref={titleRef} className="hero-title">
            <span className="hero-title-line">Intelligence.</span>
            <span className="hero-title-line">Meet the</span>
            <span className="hero-title-line hero-title-accent">real world.</span>
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            Training AI in the cloud is one thing. Giving it eyes, ears, motors, and putting it on hardware that lives in the physical world is our game.
          </p>

          <div ref={buttonsRef} className="hero-cta-group">
            <a href="#join" className="btn-primary-teal hero-btn-primary">
              <span>Join the Club</span>
              <ArrowRight size={18} />
            </a>
            <a href="#projects" className="btn-secondary-white hero-btn-secondary">
              <span>Explore Projects</span>
              <ChevronRight size={18} />
            </a>
          </div>

          <div ref={metaRef} className="hero-meta">
            <div className="meta-avatars">
              <span className="avatar-dot avatar-dot-1"></span>
              <span className="avatar-dot avatar-dot-2"></span>
              <span className="avatar-dot avatar-dot-3"></span>
            </div>
            <p>Open to all students • No prior hardware experience required</p>
          </div>
        </div>

        {/* Right Column: Visual with 3D Arduino Uno & 2D Spec Toggle */}
        <div ref={visualWrapperRef} className="hero-visual">
          {/* View Mode Switcher Header */}
          <div className="hero-view-switch-bar">
            <div className="view-switch-pills">
              <button 
                className={`view-switch-btn ${viewMode === '3d' ? 'view-switch-active' : ''}`}
                onClick={() => setViewMode('3d')}
              >
                <Box size={14} />
                <span>3D Interactive UNO</span>
                <span className="live-sparkle-pill">LIVE 3D</span>
              </button>
              <button 
                className={`view-switch-btn ${viewMode === '2d' ? 'view-switch-active' : ''}`}
                onClick={() => setViewMode('2d')}
              >
                <ImageIcon size={14} />
                <span>Blueprint Schematic</span>
              </button>
            </div>
          </div>

          {/* Conditional Display: 3D WebGL vs 2D Render */}
          {viewMode === '3d' ? (
            <ArduinoCanvas />
          ) : (
            <div className="board-card">
              <div className="board-glow"></div>
              <img 
                src={heroBoardImg} 
                alt="RISECET Embedded Development Platform" 
                className="board-render"
              />

              {/* Hotspot 1: MCU */}
              <div className="board-hotspot hotspot-top">
                <div className="hotspot-pin">
                  <span className="hotspot-dot"></span>
                  <span className="hotspot-beacon"></span>
                </div>
                <div className="hotspot-label">
                  <span className="hotspot-title">Dual-Core MCU @ 240MHz</span>
                  <span className="hotspot-desc">FreeRTOS & Low-Power Sleep</span>
                </div>
              </div>

              {/* Hotspot 2: TinyML Accelerator */}
              <div className="board-hotspot hotspot-mid">
                <div className="hotspot-pin">
                  <span className="hotspot-dot"></span>
                  <span className="hotspot-beacon"></span>
                </div>
                <div className="hotspot-label">
                  <span className="hotspot-title">TinyML Accelerator</span>
                  <span className="hotspot-desc">INT8 On-Device Inference</span>
                </div>
              </div>

              {/* Hotspot 3: Sensor Bus */}
              <div className="board-hotspot hotspot-bottom">
                <div className="hotspot-pin">
                  <span className="hotspot-dot"></span>
                  <span className="hotspot-beacon"></span>
                </div>
                <div className="hotspot-label">
                  <span className="hotspot-title">Sensor Fusion Bus</span>
                  <span className="hotspot-desc">IMU + LiDAR + CAN Bus</span>
                </div>
              </div>
            </div>
          )}

          {/* Floating Upcoming Event Card */}
          <div className="floating-event-card">
            <div className="event-icon">
              <Activity size={18} />
            </div>
            <div className="event-details">
              <span className="event-badge">Upcoming Workshop</span>
              <span className="event-name">Edge AI 101: TinyML on Microcontrollers</span>
              <span className="event-date">Thursday, 6:00 PM • Lab Room 402</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Tech Ticker Ribbon */}
      <div className="tech-ticker-bar">
        <div className="ticker-track">
          <div className="ticker-item"><span>ARDUINO UNO / ESP32</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>RASPBERRY PI 5</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>TENSORFLOW LITE MICRO</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>ROS 2 / ROBOTICS</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>NVIDIA JETSON</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>FREERTOS KERNEL</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>OPENCV EDGE</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>CUSTOM PCB FABRICATION</span></div>
          <div className="ticker-sep">•</div>
          {/* Looping repetition */}
          <div className="ticker-item"><span>ARDUINO UNO / ESP32</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>RASPBERRY PI 5</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>TENSORFLOW LITE MICRO</span></div>
          <div className="ticker-sep">•</div>
          <div className="ticker-item"><span>ROS 2 / ROBOTICS</span></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
