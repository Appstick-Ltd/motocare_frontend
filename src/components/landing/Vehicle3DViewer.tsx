"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  RotateCcw,
  Sparkles,
  Sliders,
  Eye,
  Activity,
  Layers,
  Box,
  Car,
  Bike,
  CheckCircle2,
  Wrench,
  Gauge
} from "lucide-react";

interface Hotspot {
  id: string;
  name: string;
  category: string;
  status: string;
  health: number;
  detail: string;
  position: [number, number, number];
}

export default function Vehicle3DViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Controls & Display State
  const [modelType, setModelType] = useState<"toycar" | "buggy" | "bike">("toycar");
  const [renderMode, setRenderMode] = useState<"realistic" | "wireframe" | "xray">("realistic");
  const [bodyColor, setBodyColor] = useState<string>("#EB8D00"); // AppColors.primary (Gold Amber)
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(false);

  // References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const loadedModelRef = useRef<THREE.Object3D | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: "engine",
      name: "High-Performance V6 Engine Block",
      category: "Power Plant",
      status: "Optimal Performance",
      health: 98,
      detail: "Full synthetic oil level 100%. Next oil change recommended in 12 days.",
      position: [0, 0.4, 0.5]
    },
    {
      id: "brakes",
      name: "Carbon Ceramic Brake Discs",
      category: "Safety System",
      status: "Pad Thickness 88%",
      health: 94,
      detail: "Dual-channel ABS pressure 14.5 bar. Brake fluid moisture zero.",
      position: [0.8, -0.2, 1.2]
    },
    {
      id: "suspension",
      name: "Active Air Suspension Dampers",
      category: "Handling",
      status: "Preload Balanced",
      health: 96,
      detail: "Electronic dampening active. Zero pressure leakage detected across 4 struts.",
      position: [-0.8, -0.1, -1.0]
    },
    {
      id: "tires",
      name: "P-Zero Performance Tires",
      category: "Wheels & Rubber",
      status: "Pressure 33 PSI",
      health: 91,
      detail: "Tread depth 6.2mm. Wheel alignment and dynamic balance 100% verified.",
      position: [0.85, -0.4, -1.2]
    }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. THREE.JS SCENE SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a1020, 0.05);

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(4, 2.2, 5.5);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    mountRef.current.appendChild(renderer.domElement);

    // 4. THREE.JS ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Don't go under floor
    controls.minDistance = 2;
    controls.maxDistance = 12;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;

    // 5. LIGHTING STAGE (AppColors Malta & Gold Tinted Spotlights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffffff, 4);
    mainSpot.position.set(8, 12, 8);
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.5;
    mainSpot.castShadow = true;
    scene.add(mainSpot);

    const goldRimLight = new THREE.DirectionalLight(0xEB8D00, 3.5);
    goldRimLight.position.set(-6, 4, -5);
    scene.add(goldRimLight);

    const maltaFillLight = new THREE.PointLight(0xFF5E12, 2.5, 12);
    maltaFillLight.position.set(0, -2, 5);
    scene.add(maltaFillLight);

    // 6. STAGE FLOOR & TECH GRID (AppColors #EB8D00 Grid)
    const gridHelper = new THREE.GridHelper(16, 32, 0xEB8D00, 0x17244C);
    gridHelper.position.y = -0.9;
    scene.add(gridHelper);

    // 7. PARTICLE STARFIELD (AppColors #EB8D00 Particles)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 20;
      particlePositions[i + 1] = Math.random() * 8 - 1;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xEB8D00,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 8. GLTF MODEL LOADER FUNCTION
    const loader = new GLTFLoader();

    const loadGLTFModel = (url: string, scale: number, positionY: number) => {
      setIsLoadingModel(true);
      
      // Remove old model if present
      if (loadedModelRef.current) {
        scene.remove(loadedModelRef.current);
        loadedModelRef.current = null;
      }

      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(scale, scale, scale);
          model.position.set(0, positionY, 0);

          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;

              // Apply color tint to body parts if mesh has material
              if (mesh.material) {
                const mat = mesh.material as THREE.MeshStandardMaterial;
                mat.envMapIntensity = 1.5;
              }
            }
          });

          loadedModelRef.current = model;
          scene.add(model);
          setIsLoadingModel(false);
        },
        undefined,
        (error) => {
          console.warn("GLTF load fallback: creating procedural mesh", error);
          createProceduralBike();
          setIsLoadingModel(false);
        }
      );
    };

    // PROCEDURAL FALLBACK BIKE
    const createProceduralBike = () => {
      if (loadedModelRef.current) {
        scene.remove(loadedModelRef.current);
      }

      const bikeGroup = new THREE.Group();
      
      const bodyMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(bodyColor),
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 1.0
      });

      const chromeMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.1, metalness: 0.95 });
      const tireMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
      const neonMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

      // Body Tank
      const tankGeo = new THREE.ConeGeometry(0.5, 1.2, 8);
      tankGeo.rotateZ(Math.PI / 2.2);
      const tank = new THREE.Mesh(tankGeo, bodyMat);
      tank.position.set(0.1, 0.4, 0);
      bikeGroup.add(tank);

      // Fairing
      const fairingGeo = new THREE.BoxGeometry(0.85, 0.6, 0.65);
      const fairing = new THREE.Mesh(fairingGeo, bodyMat);
      fairing.position.set(-0.7, 0.5, 0);
      bikeGroup.add(fairing);

      // Wheels
      const tireGeo = new THREE.TorusGeometry(0.48, 0.14, 16, 32);
      const wheel1 = new THREE.Mesh(tireGeo, tireMat);
      wheel1.position.set(-1.1, -0.4, 0);
      const wheel2 = new THREE.Mesh(tireGeo, tireMat);
      wheel2.position.set(0.9, -0.4, 0);

      bikeGroup.add(wheel1);
      bikeGroup.add(wheel2);

      bikeGroup.position.set(0, 0, 0);
      loadedModelRef.current = bikeGroup;
      scene.add(bikeGroup);
    };

    // Load Initial Model
    if (modelType === "toycar") {
      loadGLTFModel("/models/toycar.glb", 0.018, -0.9);
    } else if (modelType === "buggy") {
      loadGLTFModel("/models/vehicle.glb", 0.015, -0.9);
    } else {
      createProceduralBike();
    }

    // 9. ANIMATION LOOP
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();
      particleSystem.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Listener
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelType]);

  // Update Body Color Live across Three.js meshes
  useEffect(() => {
    if (!loadedModelRef.current) return;

    loadedModelRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (mat.color && (mesh.name.toLowerCase().includes("body") || mesh.name.toLowerCase().includes("car") || mesh.name === "" || mesh.name.toLowerCase().includes("paint"))) {
            mat.color.set(bodyColor);
          }
        }
      }
    });
  }, [bodyColor]);

  // Update Wireframe / X-Ray Mode across Three.js meshes
  useEffect(() => {
    if (!loadedModelRef.current) return;

    loadedModelRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (renderMode === "wireframe") {
            mat.wireframe = true;
          } else if (renderMode === "xray") {
            mat.wireframe = false;
            mat.transparent = true;
            mat.opacity = 0.45;
          } else {
            mat.wireframe = false;
            mat.transparent = false;
            mat.opacity = 1.0;
          }
        }
      }
    });
  }, [renderMode]);

  // Update Auto-Rotate Controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <div className="relative w-full h-[540px] sm:h-[640px] rounded-3xl overflow-hidden bg-[#06080e] border border-slate-800 shadow-2xl group">
      
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Loading Overlay */}
      {isLoadingModel && (
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-40 text-white">
          <Sparkles className="h-8 w-8 text-red-500 animate-spin" />
          <p className="text-xs font-bold text-slate-300">Loading ThreeJS 3D Model GLTF...</p>
        </div>
      )}

      {/* TOP HEADER OVERLAY */}
      <div className="absolute top-4 left-4 pointer-events-none z-10 space-y-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-red-500/40 text-xs text-red-400 font-bold shadow-lg">
          <Box className="h-4 w-4 text-red-500" />
          <span>AUTHENTIC THREE.JS 3D MODEL STUDIO</span>
        </div>
        <p className="text-[11px] text-slate-400 font-medium">
          Drag to rotate 360° • Scroll to zoom • Click hotspots for diagnostics
        </p>
      </div>

      {/* TOP RIGHT MODEL SELECTOR TABS */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800">
        {[
          { id: "toycar", label: "Sports GT", icon: Car },
          { id: "buggy", label: "Off-Road Buggy", icon: Box },
          { id: "bike", label: "Yamaha Bike", icon: Bike }
        ].map((m) => {
          const Icon = m.icon;
          const isActive = modelType === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setModelType(m.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3D HOTSPOT MARKERS OVERLAY */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {hotspots.map((spot) => (
          <button
            key={spot.id}
            onClick={() => setActiveHotspot(activeHotspot?.id === spot.id ? null : spot)}
            className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group/spot cursor-pointer"
            style={{
              left: `${50 + spot.position[0] * 24}%`,
              top: `${50 - spot.position[1] * 32}%`
            }}
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute h-8 w-8 rounded-full bg-red-600/40 animate-ping" />
              <div className="relative h-6 w-6 rounded-full bg-red-600 border-2 border-white text-white flex items-center justify-center font-bold text-[10px] shadow-lg shadow-red-600/60 group-hover/spot:scale-125 transition-transform">
                +
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* HOTSPOT DIAGNOSTIC POPUP CARD */}
      {activeHotspot && (
        <div className="absolute top-20 right-4 sm:right-6 w-72 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-red-500/50 shadow-2xl z-30 space-y-3 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                {activeHotspot.category}
              </span>
              <h4 className="text-xs font-extrabold text-white">{activeHotspot.name}</h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="h-6 w-6 rounded-full bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Health Index</span>
              <span className="font-extrabold text-emerald-400">{activeHotspot.health}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${activeHotspot.health}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              {activeHotspot.detail}
            </p>
          </div>
        </div>
      )}

      {/* BOTTOM FLOATING THREEJS CONTROLS TOOLBAR */}
      <div className="absolute bottom-4 left-4 right-4 z-30 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        
        {/* Render Modes */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {[
            { id: "realistic", label: "PBR Photorealism", icon: Eye },
            { id: "wireframe", label: "Neon Wireframe", icon: Sliders },
            { id: "xray", label: "X-Ray", icon: Activity }
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = renderMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setRenderMode(mode.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Color Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase hidden sm:inline">Paint Tint</span>
          <div className="flex items-center gap-1.5">
            {[
              { color: "#EB8D00", name: "App Primary Gold (#EB8D00)" },
              { color: "#FF5E12", name: "Malta Orange (#FF5E12)" },
              { color: "#17244C", name: "Deep Navy (#17244C)" },
              { color: "#3498DB", name: "Light Blue (#3498DB)" },
              { color: "#DA589B", name: "Cranberry (#DA589B)" }
            ].map((c) => (
              <button
                key={c.color}
                onClick={() => setBodyColor(c.color)}
                className={`h-5 w-5 rounded-full border-2 transition-transform cursor-pointer ${
                  bodyColor === c.color ? "border-white scale-125" : "border-slate-800 hover:scale-110"
                }`}
                style={{ backgroundColor: c.color }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Auto Rotate Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            autoRotate
              ? "bg-slate-900 border-red-500/50 text-red-400"
              : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          <RotateCcw className={`h-3.5 w-3.5 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "10s" }} />
          <span>{autoRotate ? "360° Orbit ON" : "Orbit Paused"}</span>
        </button>

      </div>

    </div>
  );
}
