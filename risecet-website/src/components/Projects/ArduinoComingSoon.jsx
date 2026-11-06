import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Cpu, Zap, Radio, Bell, Check, Terminal, Sparkles, RefreshCw } from 'lucide-react';
import './ArduinoComingSoon.css';

const ArduinoComingSoon = () => {
  const containerRef = useRef(null);
  const mcuRef = useRef(null);
  const txLedRef = useRef(null);
  const rxLedRef = useRef(null);
  const lLedRef = useRef(null);
  const trace1Ref = useRef(null);
  const trace2Ref = useRef(null);
  const trace3Ref = useRef(null);

  const [flashing, setFlashing] = useState(false);
  const [flashProgress, setFlashProgress] = useState(0);
  const [terminalMsg, setTerminalMsg] = useState('STATUS: FIRMWARE COMPILED // AWAITING DEMO DAY');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. ATmega328P Microcontroller Breathing Glow
      gsap.to(mcuRef.current, {
        filter: 'drop-shadow(0 0 16px rgba(45, 212, 191, 0.8))',
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. Onboard Pin 13 "L" LED rhythmic heartbeat
      gsap.to(lLedRef.current, {
        opacity: 1,
        fill: '#fbbf24',
        filter: 'drop-shadow(0 0 8px #fbbf24)',
        duration: 0.15,
        repeat: -1,
        repeatDelay: 0.8,
        yoyo: true,
        ease: 'steps(1)',
      });

      // 3. TX/RX Data Jitter Flicker
      const txTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
      txTimeline
        .to(txLedRef.current, { opacity: 1, fill: '#f59e0b', duration: 0.08 })
        .to(txLedRef.current, { opacity: 0.2, fill: '#78350f', duration: 0.08 })
        .to(rxLedRef.current, { opacity: 1, fill: '#f59e0b', duration: 0.08 })
        .to(rxLedRef.current, { opacity: 0.2, fill: '#78350f', duration: 0.08 });

      // 4. Sequential LED Chaser along pins 2 through 7 (Knight Rider effect)
      gsap.to('.chaser-led', {
        fill: '#2dd4bf',
        filter: 'drop-shadow(0 0 10px #2dd4bf)',
        opacity: 1,
        duration: 0.22,
        stagger: {
          each: 0.12,
          repeat: -1,
          yoyo: true,
        },
        ease: 'power1.inOut',
      });

      // 5. Electric Current Packets flowing along circuit traces
      gsap.to('.signal-pulse', {
        strokeDashoffset: -120,
        duration: 2.2,
        repeat: -1,
        ease: 'linear',
      });

      // 6. Floating badge hover
      gsap.to('.coming-soon-badge-float', {
        y: -6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Interactive "Flash Firmware" simulation with GSAP
  const handleSimulateFlash = () => {
    if (flashing) return;
    setFlashing(true);
    setFlashProgress(0);
    setTerminalMsg('[AVRDUDE] Resetting Arduino via DTR line...');

    const flashTl = gsap.timeline({
      onComplete: () => {
        setFlashing(false);
        setTerminalMsg('[SUCCESS] 12 PROJECT FIRMWARES FLASHED // DEMO DAY READY');
      },
    });

    // Rapid TX/RX flickering during upload
    flashTl
      .to([txLedRef.current, rxLedRef.current], {
        opacity: 1,
        fill: '#fbbf24',
        duration: 0.05,
        repeat: 18,
        yoyo: true,
      })
      .call(() => setTerminalMsg('[AVRDUDE] Writing 32768 bytes to flash memory...'), null, 0.4)
      .to({ val: 0 }, {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: function () {
          setFlashProgress(Math.round(this.targets()[0].val));
        },
      }, 0.4)
      .call(() => setTerminalMsg('[AVRDUDE] Verifying flash integrity (100% OK)...'), null, 2.2)
      .to('.chaser-led', {
        fill: '#10b981',
        filter: 'drop-shadow(0 0 14px #10b981)',
        duration: 0.3,
        stagger: 0.05,
        repeat: 2,
        yoyo: true,
      }, 2.3);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div ref={containerRef} className="arduino-coming-soon-wrapper">
      <div className="coming-soon-glass-card">
        {/* Top Header Badge */}
        <div className="coming-soon-badge-row">
          <div className="badge-tag coming-soon-badge-float">
            <span className="live-dot-pulse"></span>
            <span>HARDWARE LAB IN SPRINT // LAUNCHING SOON</span>
          </div>
          <div className="firmware-version-tag">
            <Cpu size={14} />
            <span>ATmega328P // REV 3.0</span>
          </div>
        </div>

        {/* Central Content */}
        <div className="coming-soon-grid">
          {/* Left Column: Interactive Animated SVG Arduino Board */}
          <div className="arduino-svg-container">
            <svg
              className="arduino-svg-board"
              viewBox="0 0 540 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Board Glow */}
              <rect x="15" y="15" width="510" height="350" rx="24" fill="#008184" opacity="0.08" filter="blur(20px)" />

              {/* Main PCB Board Base with Classic Uno Shape */}
              <path
                d="M 40 30 
                   L 460 30 
                   Q 480 30 480 50 
                   L 480 70 
                   L 505 70 
                   Q 515 70 515 80 
                   L 515 320 
                   Q 515 340 495 340 
                   L 40 340 
                   Q 25 340 25 325 
                   L 25 45 
                   Q 25 30 40 30 Z"
                fill="#0e7490"
                stroke="#155e75"
                strokeWidth="3"
              />

              {/* PCB Corner Mounting Holes */}
              <circle cx="50" cy="55" r="7" fill="#091224" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx="490" cy="95" r="7" fill="#091224" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx="490" cy="315" r="7" fill="#091224" stroke="#e2e8f0" strokeWidth="2" />
              <circle cx="170" cy="315" r="7" fill="#091224" stroke="#e2e8f0" strokeWidth="2" />

              {/* USB-B Connector Port */}
              <rect x="8" y="70" width="60" height="50" rx="4" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
              <rect x="14" y="78" width="48" height="34" rx="2" fill="#0f172a" />
              <rect x="24" y="86" width="28" height="18" fill="#e2e8f0" />

              {/* DC Barrel Power Jack */}
              <rect x="8" y="240" width="70" height="60" rx="5" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
              <circle cx="38" cy="270" r="14" fill="#0f172a" />
              <circle cx="38" cy="270" r="5" fill="#f59e0b" />

              {/* Voltage Regulator & Heatsink */}
              <rect x="100" y="245" width="30" height="40" rx="3" fill="#334155" />
              <rect x="95" y="285" width="40" height="8" rx="2" fill="#cbd5e1" />

              {/* Reset Button */}
              <circle cx="85" cy="55" r="11" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              <circle cx="85" cy="55" r="6" fill="#ea580c" />
              <text x="85" y="76" fill="#ffffff" fontSize="8" fontFamily="monospace" textAnchor="middle">RESET</text>

              {/* 16 MHz Quartz Crystal Oscillator */}
              <rect x="180" y="165" width="22" height="42" rx="10" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
              <text x="191" y="188" fill="#334155" fontSize="7" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 191 188)">16.000</text>

              {/* Circuit Copper Traces (Animated with GSAP) */}
              <path
                className="signal-pulse"
                d="M 68 95 L 140 95 L 140 140 L 250 140 L 250 170"
                stroke="#2dd4bf"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />
              <path
                className="signal-pulse"
                d="M 250 220 L 250 250 L 340 250 L 340 300 L 400 300"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />
              <path
                className="signal-pulse"
                d="M 400 120 L 330 120 L 330 170"
                stroke="#facc15"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 4"
              />

              {/* Main ATmega328P DIP IC Chip */}
              <g ref={mcuRef}>
                <rect x="230" y="160" width="160" height="48" rx="6" fill="#091224" stroke="#38bdf8" strokeWidth="2" />
                {/* Chip Notch */}
                <path d="M 230 178 A 6 6 0 0 1 230 190 Z" fill="#0e7490" />
                <text x="310" y="186" fill="#38bdf8" fontSize="12" fontWeight="700" fontFamily="monospace" textAnchor="middle">
                  ATMEGA328P-PU
                </text>
                <text x="310" y="198" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  RISECET CORE // 16MHz
                </text>

                {/* IC Pins (Top row) */}
                {[...Array(14)].map((_, i) => (
                  <rect key={`pin-t-${i}`} x={240 + i * 10} y="152" width="5" height="8" rx="1" fill="#cbd5e1" />
                ))}
                {/* IC Pins (Bottom row) */}
                {[...Array(14)].map((_, i) => (
                  <rect key={`pin-b-${i}`} x={240 + i * 10} y="208" width="5" height="8" rx="1" fill="#cbd5e1" />
                ))}
              </g>

              {/* Top Digital Header (Pins 0 to 13, GND, AREF) */}
              <rect x="250" y="38" width="220" height="18" rx="3" fill="#0f172a" stroke="#1e293b" />
              {[...Array(16)].map((_, i) => (
                <circle key={`d-pin-${i}`} cx={258 + i * 13} cy="47" r="3.2" fill="#38bdf8" />
              ))}
              <text x="360" y="32" fill="#e2e8f0" fontSize="9" fontWeight="700" fontFamily="monospace" textAnchor="middle">
                DIGITAL (PWM ~)
              </text>

              {/* Chaser LEDs on External Breadboard Rail */}
              <g className="led-chaser-row">
                <rect x="260" y="70" width="160" height="26" rx="6" fill="#091224" stroke="#155e75" />
                <text x="340" y="65" fill="#2dd4bf" fontSize="8" fontWeight="700" fontFamily="monospace" textAnchor="middle">
                  GPIO SCANNER (PINS 2-7)
                </text>
                {[...Array(6)].map((_, i) => (
                  <circle
                    key={`chaser-${i}`}
                    className="chaser-led"
                    cx={280 + i * 24}
                    cy="83"
                    r="5.5"
                    fill="#0e7490"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                ))}
              </g>

              {/* Bottom Power & Analog Headers */}
              <rect x="210" y="315" width="110" height="18" rx="3" fill="#0f172a" />
              {[...Array(8)].map((_, i) => (
                <circle key={`pwr-pin-${i}`} cx={218 + i * 13} cy="324" r="3.2" fill="#f59e0b" />
              ))}
              <text x="265" y="310" fill="#e2e8f0" fontSize="8" fontWeight="700" fontFamily="monospace" textAnchor="middle">
                POWER
              </text>

              <rect x="340" y="315" width="90" height="18" rx="3" fill="#0f172a" />
              {[...Array(6)].map((_, i) => (
                <circle key={`ana-pin-${i}`} cx={348 + i * 14} cy="324" r="3.2" fill="#10b981" />
              ))}
              <text x="385" y="310" fill="#e2e8f0" fontSize="8" fontWeight="700" fontFamily="monospace" textAnchor="middle">
                ANALOG IN
              </text>

              {/* Board Silkscreen Branding */}
              <text x="135" y="165" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="sans-serif">
                RISECET
              </text>
              <text x="135" y="180" fill="#99f6e4" fontSize="10" fontWeight="700" fontFamily="monospace">
                UNO R3 INTELLIGENCE
              </text>

              {/* Onboard Status LEDs */}
              {/* ON LED */}
              <circle cx="150" cy="115" r="4.5" fill="#10b981" stroke="#047857" strokeWidth="1" />
              <text x="150" y="130" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">ON</text>

              {/* L LED (Pin 13) */}
              <circle ref={lLedRef} cx="175" cy="115" r="4.5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
              <text x="175" y="130" fill="#ffffff" fontSize="7" fontFamily="monospace" textAnchor="middle">L</text>

              {/* TX LED */}
              <circle ref={txLedRef} cx="160" cy="98" r="3.5" fill="#78350f" opacity="0.3" />
              <text x="172" y="101" fill="#cbd5e1" fontSize="7" fontFamily="monospace">TX</text>

              {/* RX LED */}
              <circle ref={rxLedRef} cx="160" cy="85" r="3.5" fill="#78350f" opacity="0.3" />
              <text x="172" y="88" fill="#cbd5e1" fontSize="7" fontFamily="monospace">RX</text>
            </svg>

            {/* Interactive Flash Trigger Button */}
            <div className="flash-action-bar">
              <button
                className={`flash-sim-btn ${flashing ? 'flashing-active' : ''}`}
                onClick={handleSimulateFlash}
                disabled={flashing}
              >
                <RefreshCw size={15} className={flashing ? 'spin-fast' : ''} />
                <span>{flashing ? `Flashing Firmware (${flashProgress}%)...` : 'Simulate Arduino Flash (AVR)'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Coming Soon Announcement, Teasers, and Notification */}
          <div className="coming-soon-info">
            <h3 className="coming-soon-title">
              Something big is <span>compiling.</span>
            </h3>

            <p className="coming-soon-desc">
              Our hardware cohorts are currently soldering prototypes, debugging ROS 2 kinematics, and quantizing neural network weights for our inaugural project showcase.
            </p>

            {/* Simulated AVR Serial Monitor */}
            <div className="sim-terminal-box">
              <div className="sim-terminal-header">
                <Terminal size={12} />
                <span>COM3 SERIAL DEBUGGER (115200 BAUD)</span>
              </div>
              <div className="sim-terminal-text">
                <span className="terminal-prefix">&gt;</span>
                <span className="terminal-msg-line">{terminalMsg}</span>
              </div>
              {flashing && (
                <div className="terminal-progress-track">
                  <div className="terminal-progress-bar" style={{ width: `${flashProgress}%` }}></div>
                </div>
              )}
            </div>

            {/* Upcoming Project Teaser Tags */}
            <div className="teaser-pills-wrap">
              <span className="teaser-label">IN THE OVEN FOR DEMO DAY:</span>
              <div className="teaser-tags-list">
                <div className="teaser-tag-item">
                  <span className="tag-dot"></span>
                  <span>Autonomous Swarm Rovers (ROS 2)</span>
                </div>
                <div className="teaser-tag-item">
                  <span className="tag-dot"></span>
                  <span>Sub-10mW TinyML Keyword Spotter</span>
                </div>
                <div className="teaser-tag-item">
                  <span className="tag-dot"></span>
                  <span>LoRaWAN Soil Health Sensor Mesh</span>
                </div>
                <div className="teaser-tag-item">
                  <span className="tag-dot"></span>
                  <span>Bionic EMG Robotic Gripper</span>
                </div>
              </div>
            </div>

            {/* Notification Form */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="coming-soon-notify-form">
                <div className="notify-input-group">
                  <input
                    type="email"
                    required
                    placeholder="Enter your college email for early demo invite"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="notify-email-input"
                  />
                  <button type="submit" className="notify-submit-btn">
                    <Bell size={15} />
                    <span>Notify Me</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="notify-success-badge">
                <Check size={16} />
                <span>You're on the VIP Demo Day dispatch list ({email})!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArduinoComingSoon;
