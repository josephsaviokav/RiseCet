import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Wifi, Bot, Eye, CheckCircle2, ArrowRight } from 'lucide-react';
import './Edge.css';

gsap.registerPlugin(ScrollTrigger);

const Edge = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

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

      // Cards staggered reveal with scale
      gsap.fromTo(
        '.track-card',
        { opacity: 0, y: 50, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tracks = [
    {
      id: 'tinyml',
      title: 'TinyML',
      icon: <Cpu size={24} />,
      desc: 'Deploy deep neural networks on microcontrollers with milliwatts of power consumption.',
      tags: ['TensorFlow Lite', 'Edge Impulse', 'CMSIS-NN'],
      mcu: 'ARM Cortex-M4 / ESP32-S3',
    },
    {
      id: 'iot',
      title: 'Embedded IoT',
      icon: <Wifi size={24} />,
      desc: 'Connected smart sensors, mesh telemetry, and secure edge-to-cloud data pipelines.',
      tags: ['ESP32', 'MQTT / LoRaWAN', 'FreeRTOS'],
      mcu: 'LoRa Node / ESP-NOW',
    },
    {
      id: 'robotics',
      title: 'Robotics',
      icon: <Bot size={24} />,
      desc: 'Autonomous navigation, kinematic motion control, ROS 2 nodes, and closed-loop motor drivers.',
      tags: ['ROS 2', 'SLAM Navigation', 'micro-ROS'],
      mcu: 'STM32 + Raspberry Pi 5',
    },
    {
      id: 'vision',
      title: 'Computer Vision',
      icon: <Eye size={24} />,
      desc: 'Edge cameras running YOLO models, OpenCV image pipelines, and real-time object tracking.',
      tags: ['Jetson Nano', 'OpenCV', 'Google Coral TPU'],
      mcu: 'NVIDIA Jetson / K210',
    },
  ];

  return (
    <section ref={sectionRef} className="edge-section" id="tracks">
      <div className="container">
        {/* Header Row */}
        <div ref={headerRef} className="edge-header">
          <div className="edge-header-left">
            <div className="badge-tag badge-tag-dark">DOMAINS & SPECIALIZATIONS</div>
            <h2 className="edge-heading">Find your edge.</h2>
          </div>
          <p className="edge-header-desc">
            From low-level registers to quantized deep learning weights, discover where your embedded hardware journey begins.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div ref={cardsRef} className="tracks-grid">
          {tracks.map((track) => (
            <div key={track.id} className="track-card">
              <div className="track-top-row">
                <div className="track-icon-box">
                  {track.icon}
                </div>
                <div className="track-status-pill">
                  <CheckCircle2 size={13} />
                  <span>Active Track</span>
                </div>
              </div>

              <h3 className="track-title">{track.title}</h3>
              <p className="track-desc">{track.desc}</p>

              <div className="track-mcu-badge">
                <span>Hardware: </span>
                <strong>{track.mcu}</strong>
              </div>

              <div className="track-tags">
                {track.tags.map((tag, idx) => (
                  <span key={idx} className="track-tag-pill">{tag}</span>
                ))}
              </div>

              <a href="#join" className="track-card-link">
                <span>View Track Curriculum</span>
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA Quiz bar */}
        <div className="tracks-quiz-bar">
          <p>Not sure which track fits your background best?</p>
          <a href="#join" className="quiz-link">
            <span>Take the 2-minute track matching quiz</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Edge;
