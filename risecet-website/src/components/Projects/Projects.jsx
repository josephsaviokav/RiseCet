import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, Layers } from 'lucide-react';
import proj1Img from '../../assets/extracted/project-1.png';
import proj2Img from '../../assets/extracted/project-2.png';
import proj3Img from '../../assets/extracted/project-3.png';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
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

      // Staggered cards entrance with slight 3D rotation
      gsap.fromTo(
        '.project-showcase-card',
        { opacity: 0, y: 60, rotationX: 6 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.85,
          stagger: 0.18,
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

  const projects = [
    {
      id: 1,
      image: proj1Img,
      category: 'IoT / Wearable',
      title: 'AgroSense PulseBand',
      desc: 'Field-deployable biometric and microclimate wrist monitor with LoRaWAN telemetry and energy harvesting.',
      specs: 'ESP32-C3 • LoRa 915MHz • 45-day battery',
      link: '#',
    },
    {
      id: 2,
      image: proj2Img,
      category: 'Embedded Vision',
      title: 'VisionEdge Sentinel',
      desc: 'Solar-powered modular vision cube running quantized YOLO on an ESP32-S3 for biodiversity monitoring.',
      specs: 'OV2640 • INT8 YOLOv8 • Sub-100mW Sleep',
      link: '#',
    },
    {
      id: 3,
      image: proj3Img,
      category: 'Autonomous Robotics',
      title: 'Rover-01 LiDAR Explorer',
      desc: 'Four-wheel Mecanum rover with 360° LiDAR, ROS 2 Nav2 stack, and sub-centimeter indoor SLAM accuracy.',
      specs: 'RPLiDAR A1 • STM32 Motor Driver • ROS 2',
      link: '#',
    },
  ];

  return (
    <section ref={sectionRef} className="projects-section" id="projects">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="projects-header">
          <div className="projects-header-left">
            <div className="badge-tag">FEATURED HARDWARE PROJECTS</div>
            <h2 className="projects-heading">
              What could you build<br />
              <span>when the dots connect?</span>
            </h2>
          </div>
          <a href="#all-projects" className="text-link-arrow projects-all-link">
            <span>View all student project build logs</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 3 Showcase Cards Grid */}
        <div ref={gridRef} className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-showcase-card">
              <div className="project-image-box">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-render-img"
                />
                <div className="project-category-badge">
                  {project.category}
                </div>
              </div>

              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.desc}</p>

                <div className="project-specs-row">
                  <Layers size={14} />
                  <span>{project.specs}</span>
                </div>

                <div className="project-card-footer">
                  <a href={project.link} className="project-cta-link">
                    <span>Explore Build Log</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
