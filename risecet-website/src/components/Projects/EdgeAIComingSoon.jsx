import { useState } from 'react';
import { Cpu, Zap, Activity, Bell, Check, Terminal, Eye, Sparkles, Network } from 'lucide-react';
import EdgeAICanvas from './EdgeAICanvas';
import './EdgeAIComingSoon.css';

const EdgeAIComingSoon = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="edge-ai-coming-soon-wrapper">
      <div className="edge-ai-card">
        {/* Top Header Row */}
        <div className="edge-ai-top-row">
          <div className="badge-tag edge-ai-badge">
            <span className="live-cyan-pulse"></span>
            <span>ON-DEVICE TENSOR ENGINE // SHOWCASE IN PRODUCTION</span>
          </div>

          <div className="quantization-tag">
            <Network size={14} />
            <span>TINYML // INT8 NEURAL COMPILER</span>
          </div>
        </div>

        {/* 2-Column Body: 3D Edge AI Canvas Left, Info & Benchmarks Right */}
        <div className="edge-ai-grid">
          {/* Left Column: Constantly Moving 3D Edge AI Neural Canvas */}
          <div className="edge-ai-visual-col">
            <EdgeAICanvas />
          </div>

          {/* Right Column: Copy, Real-Time Model Pipeline, and Early Access Form */}
          <div className="edge-ai-info-col">
            <h3 className="edge-ai-title">
              Edge AI models currently <span>in training.</span>
            </h3>

            <p className="edge-ai-desc">
              We take neural networks off power-hungry server racks and compile them directly onto edge silicon sipping milliwatts. 12 student teams are currently testing models in the field.
            </p>

            {/* Neural Pipelines Being Prepared */}
            <div className="pipeline-specs-card">
              <div className="pipeline-header">
                <Cpu size={14} />
                <span>ACTIVE DEPLOYMENT QUEUE (FALL 2026 COHORT)</span>
              </div>

              <div className="pipeline-items-list">
                <div className="pipeline-row">
                  <div className="pipeline-badge vision-badge">VISION</div>
                  <div className="pipeline-details">
                    <strong>YOLOv8 Nano WildCam</strong>
                    <span>3.2M params • INT8 Quantized • 120 FPS</span>
                  </div>
                </div>

                <div className="pipeline-row">
                  <div className="pipeline-badge audio-badge">AUDIO</div>
                  <div className="pipeline-details">
                    <strong>Keyword Spotting RNN</strong>
                    <span>48KB SRAM • 2.8ms Latency • Sub-10mW</span>
                  </div>
                </div>

                <div className="pipeline-row">
                  <div className="pipeline-badge slam-badge">ROBOTICS</div>
                  <div className="pipeline-details">
                    <strong>Autonomous LiDAR SLAM Nav2</strong>
                    <span>micro-ROS • 4-Wheel Kinematic Control</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Early VIP Access Form */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="edge-ai-notify-form">
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

export default EdgeAIComingSoon;
