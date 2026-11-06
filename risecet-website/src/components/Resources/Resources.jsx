import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Cpu, Network, ArrowRight, Clock } from 'lucide-react';
import './Resources.css';

gsap.registerPlugin(ScrollTrigger);

const Resources = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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

      // Staggered cards
      gsap.fromTo(
        '.resource-card',
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const guides = [
    {
      id: 1,
      icon: <BookOpen size={22} />,
      badge: 'GUIDE 01 • HARDWARE BASICS',
      time: '15 min read',
      title: 'Blink without the jargon.',
      desc: 'A zero-fluff introduction to GPIO, voltage dividers, pull-up resistors, logic levels, and reading pinout sheets.',
      link: '#',
    },
    {
      id: 2,
      icon: <Cpu size={22} />,
      badge: 'GUIDE 02 • TINYML PIPELINE',
      time: '25 min read',
      title: 'Meet your first ML microcontroller.',
      desc: 'Training a sensor classification model in Python, quantizing to int8, and running inference on Cortex-M4.',
      link: '#',
    },
    {
      id: 3,
      icon: <Network size={22} />,
      badge: 'GUIDE 03 • ROS 2 & ROBOTICS',
      time: '20 min read',
      title: 'From dataset to device.',
      desc: 'Publishing IMU sensor topics, kinematic velocity commands, and motor PWM control using micro-ROS over UART.',
      link: '#',
    },
  ];

  return (
    <section ref={sectionRef} className="resources-section" id="resources">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="resources-header">
          <div className="resources-header-left">
            <div className="badge-tag">STARTERS & WORKSHOPS</div>
            <h2 className="resources-heading">
              Your next rabbit hole <span>starts here.</span>
            </h2>
          </div>
          <a href="#all-guides" className="text-link-arrow resources-all-link">
            <span>Browse documentation vault</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 3 Guide Cards */}
        <div ref={gridRef} className="resources-grid">
          {guides.map((guide) => (
            <div key={guide.id} className="resource-card">
              <div className="resource-top-bar">
                <div className="resource-icon-box">
                  {guide.icon}
                </div>
                <div className="resource-time-pill">
                  <Clock size={12} />
                  <span>{guide.time}</span>
                </div>
              </div>

              <div className="resource-badge-label">{guide.badge}</div>
              <h3 className="resource-title">{guide.title}</h3>
              <p className="resource-desc">{guide.desc}</p>

              <div className="resource-card-footer">
                <a href={guide.link} className="resource-read-link">
                  <span>Read Starter Guide</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
