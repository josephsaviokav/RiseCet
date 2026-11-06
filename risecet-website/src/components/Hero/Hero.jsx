import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Cpu, Sparkles, Zap, ChevronRight, Activity } from 'lucide-react';
import heroBoardImg from '../../assets/extracted/hero-board.png';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const metaRef = useRef(null);
  const boardWrapperRef = useRef(null);
  const tooltip1Ref = useRef(null);
  const tooltip2Ref = useRef(null);
  const tooltip3Ref = useRef(null);
  const floatingEventRef = useRef(null);

  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create master Timeline for hero entrance
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )
      // 2. Heading lines staggered
      .fromTo(
        '.hero-title-line',
        { opacity: 0, y: 40, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' },
        '-=0.3'
      )
      // 3. Subtitle fade up
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.35'
      )
      // 4. Buttons group
      .fromTo(
        buttonsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      )
      // 5. Meta info note
      .fromTo(
        metaRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )
      // 6. Right side: Board illustration with 3D feel
      .fromTo(
        boardWrapperRef.current,
        { opacity: 0, x: 60, scale: 0.92, rotation: 3 },
        { opacity: 1, x: 0, scale: 1, rotation: 0, duration: 1.1, ease: 'power3.out' },
        '-=1.0'
      )
      // 7. Interactive tooltips pop in
      .fromTo(
        [tooltip1Ref.current, tooltip2Ref.current, tooltip3Ref.current, floatingEventRef.current],
        { opacity: 0, scale: 0.8, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' },
        '-=0.4'
      );

      // Continuous gentle hover float for the board
      gsap.to(boardWrapperRef.current, {
        y: -12,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Hotspots pulsing glow
      gsap.to('.hotspot-beacon', {
        scale: 1.8,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        repeat: -1,
        stagger: 0.6,
      });
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

        {/* Right Column: High-Res 3D Board with Hotspots */}
        <div className="hero-visual">
          <div ref={boardWrapperRef} className="board-card">
            <div className="board-glow"></div>
            <img 
              src={heroBoardImg} 
              alt="RISECET Embedded Development Platform" 
              className="board-render"
            />

            {/* Hotspot 1: MCU */}
            <div 
              ref={tooltip1Ref} 
              className={`board-hotspot hotspot-top ${activeTooltip === 1 ? 'hotspot--active' : ''}`}
              onMouseEnter={() => setActiveTooltip(1)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
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
            <div 
              ref={tooltip2Ref} 
              className={`board-hotspot hotspot-mid ${activeTooltip === 2 ? 'hotspot--active' : ''}`}
              onMouseEnter={() => setActiveTooltip(2)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
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
            <div 
              ref={tooltip3Ref} 
              className={`board-hotspot hotspot-bottom ${activeTooltip === 3 ? 'hotspot--active' : ''}`}
              onMouseEnter={() => setActiveTooltip(3)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="hotspot-pin">
                <span className="hotspot-dot"></span>
                <span className="hotspot-beacon"></span>
              </div>
              <div className="hotspot-label">
                <span className="hotspot-title">Sensor Fusion Bus</span>
                <span className="hotspot-desc">IMU + LiDAR + CAN Bus</span>
              </div>
            </div>

            {/* Floating Upcoming Event Card */}
            <div ref={floatingEventRef} className="floating-event-card">
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
      </div>

      {/* Dark Tech Ticker Ribbon */}
      <div className="tech-ticker-bar">
        <div className="ticker-track">
          <div className="ticker-item"><span>ARDUINO / ESP32</span></div>
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
          {/* Repeat for seamless loop */}
          <div className="ticker-item"><span>ARDUINO / ESP32</span></div>
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
