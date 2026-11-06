import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const accordionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left Column entrance
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -45 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Accordion items entrance
      gsap.fromTo(
        '.faq-accordion-item',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'Do I need to be in an Electrical or CS major to join?',
      a: 'Not at all! Our club includes students from Mechanical, Bioengineering, Design, Applied Math, and Physics. Physical computing needs diverse skillsets — mechanical chassis, 3D enclosures, firmware, neural models, and intuitive UI.',
    },
    {
      q: 'What if I have never touched a breadboard or written C before?',
      a: 'That is exactly why RISECET exists! Our semester begins with hands-on "Hardware Hello World" labs. You will be paired with an experienced peer mentor who walks you through your first circuits and compiler toolchains.',
    },
    {
      q: 'Do I need to purchase my own microcontrollers or tools?',
      a: 'No. The club provides lab checkout kits (ESP32s, sensors, breadboards, oscilloscopes, and soldering gear) free of charge to active members. If you need special components for an approved project, the club funds them.',
    },
    {
      q: 'How much time commitment is expected per week?',
      a: 'Most members spend 3 to 5 hours a week — usually attending the Thursday evening lab sprint and a weekly team sync. During hackathons or before demo day, people often choose to hang out more, but it is flexible.',
    },
    {
      q: 'How do I get physical access to the lab room?',
      a: 'Simply fill out the membership form below and attend our 30-minute safety orientation during any Thursday lab sprint to get your keycard or badge registered.',
    },
  ];

  return (
    <section ref={sectionRef} className="faq-section" id="faq">
      <div className="container faq-container">
        {/* Left Column */}
        <div ref={leftColRef} className="faq-left">
          <div className="badge-tag">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="faq-heading">
            You don't need<br />
            <span>all the answers.</span>
          </h2>
          <p className="faq-description">
            Tinkering starts with curiosity, not mastery. If you have questions that aren't covered here, our student leads are always active on Discord.
          </p>
          <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="btn-secondary-white faq-ask-btn">
            <MessageCircle size={17} />
            <span>Ask us directly on Discord</span>
          </a>
        </div>

        {/* Right Column: Accordion */}
        <div ref={accordionRef} className="faq-accordion-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-accordion-item ${isOpen ? 'faq-item--open' : ''}`}
              >
                <button 
                  className="faq-question-btn"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-toggle-icon">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                <div className={`faq-answer-collapse ${isOpen ? 'answer--visible' : ''}`}>
                  <p className="faq-answer-text">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
