import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Wrench, Sparkles, ArrowRight, Clock, Box, Trophy } from 'lucide-react';
import labPhotoImg from '../../assets/extracted/lab-photo.png';
import './Community.css';

gsap.registerPlugin(ScrollTrigger);

const Community = () => {
  const sectionRef = useRef(null);
  const photoRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo slide in with slight scale
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, x: -50, scale: 0.94 },
        {
          opacity: 1,
          x: 0,
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

      // List items staggered entrance
      gsap.fromTo(
        '.culture-feature-item',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.16,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Clock size={22} />,
      title: 'Weekly Lab Sprints',
      desc: 'Every Thursday evening from 6 PM to 10 PM. Soldering irons hot, 3D printers humming, code compiling, and mentors on standby.',
      tag: 'Every Thursday @ 6 PM',
    },
    {
      icon: <Box size={22} />,
      title: 'Free Hardware Component Pantry',
      desc: 'No need to spend money on dev boards. Check out ESP32s, sensors, servos, cameras, and passives directly from our student inventory.',
      tag: '100% Free for Members',
    },
    {
      icon: <Trophy size={22} />,
      title: 'Demo Days & Peer Exchanges',
      desc: 'Show off half-finished breadboards, get real debugging help, exchange firmware tips, and team up for national robotics hackathons.',
      tag: 'Monthly Showcases',
    },
  ];

  return (
    <section ref={sectionRef} className="community-section" id="community">
      <div className="container">
        {/* Header */}
        <div className="community-header">
          <div className="badge-tag badge-tag-dark">THE LAB & CULTURE</div>
          <h2 className="community-heading">
            The best component? <span>Each other.</span>
          </h2>
          <a href="#join" className="text-link-arrow community-link">
            <span>Join our next lab sprint</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 2 Column Body: Photo Left, Features Right */}
        <div className="community-body">
          {/* Left Photo */}
          <div ref={photoRef} className="community-photo-card">
            <img 
              src={labPhotoImg} 
              alt="RISECET Lab Team Collaborating" 
              className="lab-photo"
            />
            <div className="photo-caption">
              <span className="caption-dot"></span>
              <span>Lab Room 402 • Thursday Sprint #48</span>
            </div>
          </div>

          {/* Right Features List */}
          <div ref={listRef} className="community-features-list">
            {features.map((feat, index) => (
              <div key={index} className="culture-feature-item">
                <div className="culture-icon-box">
                  {feat.icon}
                </div>
                <div className="culture-text-box">
                  <div className="culture-top-line">
                    <h3 className="culture-title">{feat.title}</h3>
                    <span className="culture-tag">{feat.tag}</span>
                  </div>
                  <p className="culture-desc">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
