import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import './Steps.css';

gsap.registerPlugin(ScrollTrigger);

const Steps = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsGridRef = useRef(null);

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

      // Steps staggered entrance
      gsap.fromTo(
        '.cadence-step-card',
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsGridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      stepNum: '01',
      title: "What's 100% possible",
      desc: 'Pick a sensor, map the physical input, and prove the core constraint on paper before writing a line of code.',
      milestone: 'Spec Sheet Verified',
    },
    {
      stepNum: '02',
      title: 'Blink the first light',
      desc: 'Breadboard the circuit. Wire power rails. Verify pin logic levels on a scope and get the LED toggling.',
      milestone: 'Hardware Hello World',
    },
    {
      stepNum: '03',
      title: 'Add the intelligence',
      desc: 'Deploy your quantized TinyML model, tune closed-loop PID gains, and set up real-time telemetry.',
      milestone: 'Model Inference Live',
    },
    {
      stepNum: '04',
      title: 'Make it battle-ready',
      desc: 'Route custom PCB traces in KiCad, 3D print the enclosure, solder terminals, and stress test in the field.',
      milestone: 'Demo Day Ready',
    },
  ];

  return (
    <section ref={sectionRef} className="cadence-section" id="cadence">
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="cadence-header">
          <div className="badge-tag">THE BUILD CADENCE</div>
          <h2 className="cadence-heading">
            Big curiosity. <span>Small iterations.</span>
          </h2>
          <p className="cadence-subtitle">
            Nobody builds an autonomous robot on day one. Here is how we break complex hardware down into weekly wins.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div ref={stepsGridRef} className="cadence-grid">
          {steps.map((step, index) => (
            <div key={index} className="cadence-step-card">
              <div className="step-top-row">
                <span className="step-number">{step.stepNum}</span>
                {index < steps.length - 1 && (
                  <span className="step-connector-arrow">
                    <ChevronRight size={18} />
                  </span>
                )}
              </div>

              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>

              <div className="step-milestone-pill">
                <span>Milestone: </span>
                <strong>{step.milestone}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
