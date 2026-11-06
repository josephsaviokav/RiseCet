import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Edge from './components/Edge/Edge';
import Projects from './components/Projects/Projects';
import Experiment from './components/Experiment/Experiment';
import Steps from './components/Steps/Steps';
import Community from './components/Community/Community';
import Resources from './components/Resources/Resources';
import FAQ from './components/FAQ/FAQ';
import CTA from './components/CTA/CTA';
import Footer from './components/Footer/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scrolling for hash anchor links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(a => a.addEventListener('click', handleAnchorClick));

    // Refresh ScrollTrigger calculations after initial layout render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      anchors.forEach(a => a.removeEventListener('click', handleAnchorClick));
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Edge />
        <Projects />
        <Experiment />
        <Steps />
        <Community />
        <Resources />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
