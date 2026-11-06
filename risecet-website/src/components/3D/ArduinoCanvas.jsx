import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { Rotate3D, Eye, Layers, Compass, RefreshCw, ZoomIn, Info } from 'lucide-react';
import './ArduinoCanvas.css';

const ArduinoCanvas = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelGroupRef = useRef(null);
  const animFrameIdRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isWireframe, setIsWireframe] = useState(false);
  const [activePreset, setActivePreset] = useState('isometric');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(3.2, 2.8, 3.6);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.minDistance = 1.5;
    controls.maxDistance = 8.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't flip below ground
    controlsRef.current = controls;

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight1.position.set(5, 8, 6);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    scene.add(dirLight1);

    // Cyan/Teal Accent Rim Light
    const rimLight = new THREE.DirectionalLight(0x2dd4bf, 2.8);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Soft Blue Fill Light
    const fillLight = new THREE.PointLight(0x38bdf8, 1.5, 12);
    fillLight.position.set(0, -2, 2);
    scene.add(fillLight);

    // Subtle Ground Glow Mesh
    const groundGeo = new THREE.PlaneGeometry(12, 12);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.15 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.55;
    ground.receiveShadow = true;
    scene.add(ground);

    // 6. Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // 7. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/arduino_uno.glb',
      (gltf) => {
        const object = gltf.scene;

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim; // Normalize to around 2.4 units
        object.scale.set(scale, scale, scale);

        // Center the pivot
        object.position.x = -center.x * scale;
        object.position.y = -center.y * scale;
        object.position.z = -center.z * scale;

        // Enable shadows and enhance materials
        object.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.envMapIntensity = 1.2;
              child.material.needsUpdate = true;
            }
          }
        });

        modelGroup.add(object);
        setLoading(false);

        // Initial GSAP Camera Fly-in & Model Entrance
        gsap.fromTo(
          camera.position,
          { x: 6, y: 7, z: 8 },
          { x: 3.2, y: 2.8, z: 3.6, duration: 1.6, ease: 'power3.out' }
        );

        gsap.fromTo(
          modelGroup.rotation,
          { y: -Math.PI },
          { y: 0, duration: 1.8, ease: 'power3.out' }
        );
      },
      (xhr) => {
        if (xhr.total > 0) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(pct);
        } else {
          setLoadProgress(Math.min(95, Math.round(xhr.loaded / (7.25 * 1024 * 1024) * 100)));
        }
      },
      (error) => {
        console.error('Error loading Arduino GLB:', error);
        setLoading(false);
      }
    );

    // 8. Animation Loop
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 450;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
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

  // Toggle Auto-Rotate
  const handleToggleAutoRotate = () => {
    const next = !autoRotate;
    setAutoRotate(next);
    if (controlsRef.current) {
      controlsRef.current.autoRotate = next;
    }
  };

  // Toggle Wireframe
  const handleToggleWireframe = () => {
    const next = !isWireframe;
    setIsWireframe(next);
    if (modelGroupRef.current) {
      modelGroupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = next;
        }
      });
    }
  };

  // Camera Presets using GSAP
  const handlePreset = (preset) => {
    setActivePreset(preset);
    if (!cameraRef.current || !controlsRef.current) return;

    const targets = {
      isometric: { x: 3.2, y: 2.8, z: 3.6, targetY: 0 },
      top: { x: 0.05, y: 4.8, z: 0.1, targetY: 0 },
      ports: { x: -4.2, y: 1.4, z: 1.2, targetY: 0 },
      chipset: { x: 1.4, y: 1.6, z: 1.8, targetY: 0 },
    };

    const target = targets[preset] || targets.isometric;

    // Smooth camera transition via GSAP
    gsap.to(cameraRef.current.position, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration: 1.1,
      ease: 'power3.inOut',
      onUpdate: () => {
        controlsRef.current.update();
      },
    });

    gsap.to(controlsRef.current.target, {
      x: 0,
      y: target.targetY,
      z: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  return (
    <div className="arduino-3d-wrapper">
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="arduino-webgl-canvas"></div>

      {/* Loading Overlay */}
      {loading && (
        <div className="canvas-loader-overlay">
          <div className="loader-spinner"></div>
          <div className="loader-text-group">
            <span className="loader-title">Loading 3D Arduino UNO</span>
            <span className="loader-bytes">7.2 MB High-Fidelity Asset ({loadProgress}%)</span>
          </div>
          <div className="loader-progress-track">
            <div className="loader-progress-bar" style={{ width: `${loadProgress}%` }}></div>
          </div>
        </div>
      )}

      {/* Interactive Controls Overlay HUD */}
      {!loading && (
        <>
          {/* Top Floating Badge */}
          <div className="canvas-hud-top">
            <div className="hud-badge">
              <Rotate3D size={14} className="hud-icon-spin" />
              <span className="hud-text-full">Interactive 3D Model • Drag to Orbit • Scroll to Zoom</span>
              <span className="hud-text-short">3D Model • Drag to Orbit</span>
            </div>
          </div>

          {/* Camera Presets Toolbar */}
          <div className="canvas-hud-bottom">
            <div className="preset-pill-group">
              <button 
                className={`preset-btn ${activePreset === 'isometric' ? 'preset-active' : ''}`}
                onClick={() => handlePreset('isometric')}
                title="Isometric Perspective"
              >
                <Compass size={13} />
                <span>Isometric</span>
              </button>
              <button 
                className={`preset-btn ${activePreset === 'top' ? 'preset-active' : ''}`}
                onClick={() => handlePreset('top')}
                title="Top-Down Pinout View"
              >
                <Eye size={13} />
                <span>Top Pinout</span>
              </button>
              <button 
                className={`preset-btn ${activePreset === 'ports' ? 'preset-active' : ''}`}
                onClick={() => handlePreset('ports')}
                title="USB & Power Barrel Ports"
              >
                <Layers size={13} />
                <span>USB & DC</span>
              </button>
              <button 
                className={`preset-btn ${activePreset === 'chipset' ? 'preset-active' : ''}`}
                onClick={() => handlePreset('chipset')}
                title="Focus ATmega328P Chip"
              >
                <ZoomIn size={13} />
                <span>Chipset</span>
              </button>
            </div>

            {/* Utility Toggles */}
            <div className="util-btn-group">
              <button 
                className={`util-icon-btn ${autoRotate ? 'util-active' : ''}`}
                onClick={handleToggleAutoRotate}
                title={autoRotate ? 'Pause Turntable' : 'Start Turntable'}
              >
                <RefreshCw size={14} className={autoRotate ? 'spin-slow' : ''} />
              </button>
              <button 
                className={`util-icon-btn ${isWireframe ? 'util-active' : ''}`}
                onClick={handleToggleWireframe}
                title="Toggle Wireframe Shader"
              >
                <Layers size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArduinoCanvas;
