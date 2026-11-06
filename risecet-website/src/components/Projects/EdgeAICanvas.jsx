import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { Activity, Cpu, Eye, Zap, Layers, Play, Pause, Sparkles } from 'lucide-react';
import './EdgeAICanvas.css';

const EdgeAICanvas = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const animFrameIdRef = useRef(null);

  // 3D Objects refs
  const neuralGroupRef = useRef(null);
  const gimbalRing1Ref = useRef(null);
  const gimbalRing2Ref = useRef(null);
  const gimbalRing3Ref = useRef(null);
  const coreMeshRef = useRef(null);
  const particlesRef = useRef([]);

  const [activeModel, setActiveModel] = useState('vision'); // 'vision', 'audio', 'sensor'
  const [inferenceFps, setInferenceFps] = useState(128);
  const [latencyMs, setLatencyMs] = useState(6.4);
  const [powerMw, setPowerMw] = useState(340);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 460;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4.5, 3.2, 5.0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    rendererRef.current = renderer;

    container.innerHTML = '';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.maxWidth = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.8;
    controls.minDistance = 2.5;
    controls.maxDistance = 10;
    controlsRef.current = controls;

    // 5. Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const tealLight = new THREE.DirectionalLight(0x2dd4bf, 3.0);
    tealLight.position.set(-6, -3, -5);
    scene.add(tealLight);

    const coreLight = new THREE.PointLight(0x2dd4bf, 4, 8);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // 6. Master Neural Network Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);
    neuralGroupRef.current = masterGroup;

    // A. Central Edge TPU Chip / Core Tensor Polyhedron
    const coreGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x091224,
      emissive: 0x0e7490,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    masterGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Wireframe overlay on core
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreWire = new THREE.Mesh(coreGeo, coreWireMat);
    coreMesh.add(coreWire);

    // B. Outer Gimbal Accelerator Rings (Constantly Rotating)
    const ringGeo1 = new THREE.TorusGeometry(1.9, 0.025, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    masterGroup.add(ring1);
    gimbalRing1Ref.current = ring1;

    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x2dd4bf,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    masterGroup.add(ring2);
    gimbalRing2Ref.current = ring2;

    const ringGeo3 = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.4,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 3;
    masterGroup.add(ring3);
    gimbalRing3Ref.current = ring3;

    // C. 3D Neural Network Nodes (Neurons)
    const nodeCount = 36;
    const nodePositions = [];
    const nodeSpheres = [];

    const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMatInput = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const nodeMatHidden = new THREE.MeshBasicMaterial({ color: 0x2dd4bf });
    const nodeMatOutput = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    for (let i = 0; i < nodeCount; i++) {
      // Fibonacci sphere distribution for uniform neural cloud
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.5 + (i % 3) * 0.35;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const mat = i < 10 ? nodeMatInput : i < 28 ? nodeMatHidden : nodeMatOutput;
      const sphere = new THREE.Mesh(nodeGeo, mat);
      sphere.position.copy(pos);
      masterGroup.add(sphere);
      nodeSpheres.push(sphere);
    }

    // D. Synaptic Lines Interconnecting Neurons
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x155e75,
      transparent: true,
      opacity: 0.35,
    });

    const linePoints = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 1.35) {
          linePoints.push(nodePositions[i]);
          linePoints.push(nodePositions[j]);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    masterGroup.add(linesMesh);

    // E. Constantly Moving Data Synapse Packets (Flashes along lines)
    const packetCount = 28;
    const packetGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x5eead4 });
    const packets = [];

    for (let p = 0; p < packetCount; p++) {
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      // Pick random pair of connected nodes
      const startIdx = Math.floor(Math.random() * (nodePositions.length - 1));
      let endIdx = (startIdx + 1 + Math.floor(Math.random() * 4)) % nodePositions.length;

      mesh.position.copy(nodePositions[startIdx]);
      masterGroup.add(mesh);

      packets.push({
        mesh,
        startPos: nodePositions[startIdx],
        endPos: nodePositions[endIdx],
        t: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      });
    }
    particlesRef.current = packets;

    // F. Ambient Floating Sensor Dust
    const dustCount = 80;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let d = 0; d < dustCount * 3; d += 3) {
      dustPositions[d] = (Math.random() - 0.5) * 8;
      dustPositions[d + 1] = (Math.random() - 0.5) * 8;
      dustPositions[d + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // 7. GSAP Core Breathing & Intro Animation
    gsap.fromTo(
      camera.position,
      { x: 9, y: 7, z: 9 },
      { x: 4.5, y: 3.2, z: 5.0, duration: 1.8, ease: 'power3.out' }
    );

    gsap.to(coreMesh.scale, {
      x: 1.15,
      y: 1.15,
      z: 1.15,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // 8. Continuous High-Performance Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Constantly rotate gimbal rings around different spatial axes
      if (ring1) ring1.rotation.z += delta * 0.45;
      if (ring2) ring2.rotation.y += delta * 0.65;
      if (ring3) ring3.rotation.x += delta * 0.35;

      // Rotate central TPU core
      if (coreMesh) {
        coreMesh.rotation.y += delta * 0.5;
        coreMesh.rotation.x += delta * 0.25;
      }

      // Constantly advance synapse data packets along vectors
      for (let i = 0; i < packets.length; i++) {
        const item = packets[i];
        item.t += item.speed;
        if (item.t >= 1) {
          item.t = 0;
          // Pick a new random target
          const newStart = Math.floor(Math.random() * nodePositions.length);
          const newEnd = (newStart + 1 + Math.floor(Math.random() * 5)) % nodePositions.length;
          item.startPos = nodePositions[newStart];
          item.endPos = nodePositions[newEnd];
        }
        item.mesh.position.lerpVectors(item.startPos, item.endPos, item.t);
      }

      // Floating dust rotation
      dustPoints.rotation.y = time * 0.04;

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 460;
      if (newW === 0 || newH === 0) return;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH, false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);

  // GSAP Shockwave Neural Flash Trigger
  const handlePulseWeights = () => {
    if (!coreMeshRef.current || !neuralGroupRef.current) return;

    // Simulate burst metrics spike
    setInferenceFps(240);
    setLatencyMs(4.1);
    setPowerMw(480);

    const pulseTl = gsap.timeline({
      onComplete: () => {
        setInferenceFps(128);
        setLatencyMs(6.4);
        setPowerMw(340);
      },
    });

    pulseTl
      .to(coreMeshRef.current.scale, {
        x: 1.5,
        y: 1.5,
        z: 1.5,
        duration: 0.25,
        ease: 'power2.out',
      })
      .to(gimbalRing1Ref.current.scale, {
        x: 1.25,
        y: 1.25,
        z: 1.25,
        duration: 0.3,
        ease: 'power1.out',
      }, '<')
      .to(coreMeshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      })
      .to(gimbalRing1Ref.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '-=0.4');
  };

  const handleModelChange = (model) => {
    setActiveModel(model);
    if (model === 'vision') {
      setInferenceFps(128);
      setLatencyMs(6.4);
      setPowerMw(340);
    } else if (model === 'audio') {
      setInferenceFps(250);
      setLatencyMs(2.8);
      setPowerMw(85);
    } else {
      setInferenceFps(500);
      setLatencyMs(1.1);
      setPowerMw(42);
    }
  };

  return (
    <div className="edge-ai-canvas-container">
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="edge-ai-webgl"></div>

      {/* Floating HUD Overlays */}
      <div className="edge-ai-hud-top">
        <div className="edge-ai-chip-pill">
          <span className="pulse-cyan-dot"></span>
          <span>EDGE TPU TENSOR CORES // ACTIVE PIPELINE</span>
        </div>

        <button 
          className="pulse-shockwave-btn"
          onClick={handlePulseWeights}
          title="Pulse Neural Synapses (GSAP)"
        >
          <Zap size={14} />
          <span>Pulse Weights</span>
        </button>
      </div>

      {/* Live Inference Telemetry Glass HUD */}
      <div className="edge-ai-metrics-hud">
        <div className="metric-box">
          <span className="metric-label">ON-DEVICE FPS</span>
          <strong className="metric-val metric-val-cyan">{inferenceFps} FPS</strong>
        </div>
        <div className="metric-divider"></div>
        <div className="metric-box">
          <span className="metric-label">INFERENCE LATENCY</span>
          <strong className="metric-val metric-val-teal">{latencyMs} ms</strong>
        </div>
        <div className="metric-divider"></div>
        <div className="metric-box">
          <span className="metric-label">INT8 QUANTIZED</span>
          <strong className="metric-val metric-val-amber">{powerMw} mW</strong>
        </div>
      </div>

      {/* Bottom Model Selector Pills */}
      <div className="edge-ai-model-selector">
        <button
          className={`model-pill-btn ${activeModel === 'vision' ? 'model-pill-active' : ''}`}
          onClick={() => handleModelChange('vision')}
        >
          <Eye size={13} />
          <span>YOLOv8 Edge Vision</span>
        </button>
        <button
          className={`model-pill-btn ${activeModel === 'audio' ? 'model-pill-active' : ''}`}
          onClick={() => handleModelChange('audio')}
        >
          <Activity size={13} />
          <span>Keyword Spotter RNN</span>
        </button>
        <button
          className={`model-pill-btn ${activeModel === 'sensor' ? 'model-pill-active' : ''}`}
          onClick={() => handleModelChange('sensor')}
        >
          <Layers size={13} />
          <span>Sensor Fusion MLP</span>
        </button>
      </div>

      {/* Instruction Tip */}
      <div className="edge-ai-interaction-hint">
        <span>Click &amp; Drag to Orbit 3D Tensor Graph • Constantly Firing Synaptic Weights</span>
      </div>
    </div>
  );
};

export default EdgeAICanvas;
