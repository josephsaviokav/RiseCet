import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Box, Cpu, Wrench } from 'lucide-react';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left Column entrance
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

      // Right Column text and stats entrance with staggered timeline
      const rightTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      rightTl
        .fromTo(
          '.about-body-text',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        )
        .fromTo(
          '.about-stat-card',
          { opacity: 0, y: 35, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="container about-container">
        {/* Left Column */}
        <div ref={leftColRef} className="about-left">
          <div className="badge-tag">OUR PHILOSOPHY</div>
          <h2 className="about-heading">
            Less just imagining.<br />
            <span>More making it work.</span>
          </h2>
          <a href="#manifesto" className="text-link-arrow about-manifesto-link">
            <span>Read our club manifesto</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Right Column */}
        <div ref={rightColRef} className="about-right">
          <p className="about-body-text">
            RISECET is where curiosity meets circuit boards. We take machine learning models off the GPU cluster and compile them down to run on microcontrollers sipping microamps. We believe the future of AI isn't just in the cloud — it's embedded in everything around us.
          </p>

          <div className="about-stats-grid">
            <div className="about-stat-card">
              <div className="stat-card-icon">
                <Box size={22} />
              </div>
              <h3 className="stat-card-title">24+ Hardware Kits</h3>
              <p className="stat-card-desc">
                Available for checkout: ESP32-S3, STM32, Raspberry Pi 5, Coral Edge TPUs, and comprehensive sensor arrays.
              </p>
            </div>

            <div className="about-stat-card">
              <div className="stat-card-icon">
                <Wrench size={22} />
              </div>
              <h3 className="stat-card-title">Learn by Doing</h3>
              <p className="stat-card-desc">
                Zero to physical prototype in 4 weeks. No prerequisite theory tests — pick a project and build it with mentors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
