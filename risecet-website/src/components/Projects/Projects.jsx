import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import ArduinoComingSoon from './ArduinoComingSoon';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
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

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="projects-header">
          <div className="projects-header-left">
            <div className="badge-tag">SHOWCASE IN DEVELOPMENT</div>
            <h2 className="projects-heading">
              What could you build<br />
              <span>when the dots connect?</span>
            </h2>
          </div>
          <a href="#join" className="text-link-arrow projects-all-link">
            <span>Submit a project for the next cohort</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Dynamic Arduino GSAP Coming Soon Showcase */}
        <div className="projects-coming-soon-wrapper">
          <ArduinoComingSoon />
        </div>
      </div>
    </section>
  );
};

export default Projects;
