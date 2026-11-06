import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, Pause, RotateCcw, FastForward, Sliders, 
  Terminal, Activity, Zap, Cpu, ArrowRight 
} from 'lucide-react';
import workbenchImg from '../../assets/extracted/workbench.png';
import './Experiment.css';

gsap.registerPlugin(ScrollTrigger);

const Experiment = () => {
  const sectionRef = useRef(null);
  const benchContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const oscilloscopeRef = useRef(null);
  const pin13LedRef = useRef(null);
  const mcuPulseRef = useRef(null);
  const logTerminalRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progressVal, setProgressVal] = useState(0);
  const [timeScaleVal, setTimeScaleVal] = useState(1);
  const [activePinState, setActivePinState] = useState(true);
  const [telemetryLogs, setTelemetryLogs] = useState([
    '[INIT] MCU bootloader initialized @ 240MHz',
    '[OK] I2C bus scan: 0x68 (MPU6050), 0x76 (BMP280)',
    '[TINYML] Model weights loaded: 142KB int8',
    '[SERIAL] Inference cycle: 14.2ms | Acc: 98.4%',
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create an animated GSAP Timeline for the workbench cycle
      const tl = gsap.timeline({
        repeat: -1,
        onUpdate: () => {
          if (timelineRef.current) {
            setProgressVal(timelineRef.current.progress());
          }
        },
      });

      timelineRef.current = tl;

      // Timeline sequence demonstrating GSAP capabilities:
      // Tweens with labels, position parameters ("<", "-=0.3", "+=0.2")
      tl.addLabel('powerOn', 0)
        .to(mcuPulseRef.current, {
          boxShadow: '0 0 25px #10b981',
          scale: 1.05,
          duration: 0.5,
          ease: 'power2.out',
        }, 'powerOn')
        .addLabel('clockCycle', '+=0.2')
        .to(pin13LedRef.current, {
          backgroundColor: '#38bdf8',
          boxShadow: '0 0 20px #38bdf8',
          duration: 0.3,
          repeat: 3,
          yoyo: true,
        }, 'clockCycle')
        .addLabel('sensorBurst', '+=0.1')
        .to('.bench-telemetry-bar', {
          width: '88%',
          duration: 0.6,
          ease: 'power3.inOut',
        }, 'sensorBurst')
        .to(oscilloscopeRef.current, {
          x: -120,
          duration: 1.2,
          ease: 'none',
        }, 'sensorBurst-=0.2')
        .addLabel('inference', '+=0.1')
        .to(mcuPulseRef.current, {
          boxShadow: '0 0 35px #38bdf8',
          duration: 0.4,
        }, 'inference')
        .to('.bench-telemetry-bar', {
          width: '35%',
          duration: 0.5,
          ease: 'power2.out',
        }, '+=0.3');

      // ScrollTrigger to entrance the workbench
      gsap.fromTo(
        benchContainerRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
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

  // GSAP Timeline Controls
  const handleTogglePlay = () => {
    if (!timelineRef.current) return;
    if (isPlaying) {
      timelineRef.current.pause();
      setIsPlaying(false);
    } else {
      timelineRef.current.resume();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    if (!timelineRef.current) return;
    timelineRef.current.restart();
    setIsPlaying(true);
  };

  const handleReverse = () => {
    if (!timelineRef.current) return;
    timelineRef.current.reverse();
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const val = parseFloat(e.target.value);
    setProgressVal(val);
    if (timelineRef.current) {
      timelineRef.current.pause();
      timelineRef.current.progress(val);
      setIsPlaying(false);
    }
  };

  const handleTimeScale = (scale) => {
    setTimeScaleVal(scale);
    if (timelineRef.current) {
      timelineRef.current.timeScale(scale);
    }
  };

  const handleTogglePin13 = () => {
    setActivePinState(!activePinState);
    const newLog = `[GPIO] Pin 13 toggled to ${!activePinState ? 'HIGH (3.3V)' : 'LOW (0V)'}`;
    setTelemetryLogs(prev => [...prev.slice(-3), newLog]);
  };

  return (
    <section ref={sectionRef} className="experiment-section" id="workbench">
      <div className="container">
        {/* Header */}
        <div className="experiment-header">
          <div className="badge-tag">INTERACTIVE HARDWARE TWIN</div>
          <h2 className="experiment-heading">
            Don't just read about it.<br />
            <span>Get inside the experiment.</span>
          </h2>
          <p className="experiment-subtitle">
            An interactive digital twin of our hardware bench. Test firmware logic, toggle GPIO pins, and watch live telemetry powered by GSAP Timeline.
          </p>
        </div>

        {/* Workbench Card with Live Digital Twin */}
        <div ref={benchContainerRef} className="workbench-card">
          {/* Top Workbench Window Chrome */}
          <div className="workbench-top-bar">
            <div className="window-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="bench-title-tab">
              <Cpu size={14} />
              <span>RISECET-MCU-SIMULATOR // FIRMWARE_v2.4.elf</span>
            </div>
            <div className="bench-status-badge">
              <span className="pulse-green"></span>
              <span>LIVE CONNECTION (115200 BAUD)</span>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="workbench-body">
            {/* Left Control Column */}
            <div className="bench-sidebar">
              <div className="sidebar-group">
                <span className="group-label">HARDWARE PINS</span>
                <button 
                  className={`pin-toggle-btn ${activePinState ? 'pin-active' : ''}`}
                  onClick={handleTogglePin13}
                >
                  <span className="pin-indicator"></span>
                  <span>GPIO 13 (Built-in LED)</span>
                  <span className="pin-val">{activePinState ? 'HIGH' : 'LOW'}</span>
                </button>

                <div className="pin-spec-row">
                  <span>ADC CH0:</span>
                  <strong>1.84 V</strong>
                </div>
                <div className="pin-spec-row">
                  <span>PWM (Servo):</span>
                  <strong>1500 µs</strong>
                </div>
                <div className="pin-spec-row">
                  <span>VCC Rail:</span>
                  <strong>3.31 V</strong>
                </div>
              </div>

              <div className="sidebar-group">
                <span className="group-label">TELEMETRY MONITOR</span>
                <div className="bench-meter">
                  <div className="meter-label">
                    <span>MCU Core Temp</span>
                    <strong>38.4 °C</strong>
                  </div>
                  <div className="meter-track">
                    <div className="meter-fill" style={{ width: '42%' }}></div>
                  </div>
                </div>

                <div className="bench-meter">
                  <div className="meter-label">
                    <span>Inference Load</span>
                    <strong>14.2 ms</strong>
                  </div>
                  <div className="meter-track">
                    <div className="meter-fill meter-fill-teal bench-telemetry-bar" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>

              {/* Live Terminal Output */}
              <div className="sidebar-group terminal-group">
                <div className="terminal-header">
                  <Terminal size={12} />
                  <span>SERIAL STREAM</span>
                </div>
                <div ref={logTerminalRef} className="terminal-body">
                  {telemetryLogs.map((log, idx) => (
                    <div key={idx} className="log-line">{log}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center: Extracted High-Res Workbench Graphic + Animated Overlays */}
            <div className="bench-center">
              <div className="board-preview-container">
                <img 
                  src={workbenchImg} 
                  alt="Interactive Hardware Bench" 
                  className="workbench-render-img"
                />

                {/* Animated Interactive Overlays */}
                <div 
                  ref={mcuPulseRef} 
                  className="interactive-overlay mcu-core-overlay"
                  title="Dual-Core MCU"
                ></div>

                <div 
                  ref={pin13LedRef} 
                  className={`interactive-overlay pin13-led-overlay ${activePinState ? 'led-lit' : ''}`}
                  title="Pin 13 LED"
                ></div>

                {/* Live Oscilloscope Trace Line */}
                <div className="scope-box">
                  <div className="scope-label">OSCILLOSCOPE CH1</div>
                  <div className="scope-screen">
                    <div ref={oscilloscopeRef} className="scope-waveform"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom GSAP Timeline Interactive Controller Bar */}
          <div className="gsap-controller-bar">
            <div className="controller-brand">
              <span className="gsap-pill">GSAP 3 TIMELINE</span>
              <span className="timeline-state">Playhead: {(progressVal * 100).toFixed(0)}%</span>
            </div>

            {/* Playback Controls */}
            <div className="playback-buttons">
              <button 
                className="ctl-btn" 
                onClick={handleRestart} 
                title="Restart Timeline"
              >
                <RotateCcw size={15} />
              </button>
              <button 
                className={`ctl-btn ctl-btn-play ${isPlaying ? 'ctl-active' : ''}`} 
                onClick={handleTogglePlay}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button 
                className="ctl-btn" 
                onClick={handleReverse} 
                title="Reverse Playhead"
              >
                <FastForward size={15} style={{ transform: 'scaleX(-1)' }} />
              </button>
            </div>

            {/* Scrub Slider */}
            <div className="scrub-container">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={progressVal}
                onChange={handleSeek}
                className="gsap-scrubber"
                title="Scrub GSAP Timeline"
              />
            </div>

            {/* TimeScale Toggles */}
            <div className="timescale-group">
              <span>Speed:</span>
              <button 
                className={`speed-btn ${timeScaleVal === 0.5 ? 'speed-active' : ''}`}
                onClick={() => handleTimeScale(0.5)}
              >
                0.5x
              </button>
              <button 
                className={`speed-btn ${timeScaleVal === 1 ? 'speed-active' : ''}`}
                onClick={() => handleTimeScale(1)}
              >
                1.0x
              </button>
              <button 
                className={`speed-btn ${timeScaleVal === 2 ? 'speed-active' : ''}`}
                onClick={() => handleTimeScale(2)}
              >
                2.0x
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiment;
