"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const HAS_GLB = true;

interface LandingWatchProps {
  scrollProgress: number;
}

function buildFallbackWatch(group: THREE.Group) {
  while (group.children.length > 0) group.remove(group.children[0]);
  const caseMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#C8CAD4"),
    metalness: 0.92,
    roughness: 0.15,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#F5F0E8"),
    metalness: 0.05,
    roughness: 0.6,
  });
  const handMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2C2820"),
    metalness: 0.8,
    roughness: 0.2,
  });
  const strapMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8B7355"),
    metalness: 0.02,
    roughness: 0.88,
  });
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#E8F0F8"),
    transparent: true,
    opacity: 0.18,
    roughness: 0,
    metalness: 0,
    transmission: 0.8,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#8B7355"),
    metalness: 0.7,
    roughness: 0.3,
  });
  const strapGeo = new THREE.BoxGeometry(0.55, 0.75, 0.09);
  const st = new THREE.Mesh(strapGeo, strapMat);
  st.position.set(0, 0.96, -0.04);
  group.add(st);
  const sb = new THREE.Mesh(strapGeo, strapMat);
  sb.position.set(0, -0.96, -0.04);
  group.add(sb);
  const caseBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.72, 0.72, 0.22, 64),
    caseMat
  );
  caseBody.rotation.x = Math.PI / 2;
  group.add(caseBody);
  const bezel = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.055, 16, 64),
    caseMat
  );
  bezel.position.z = 0.11;
  group.add(bezel);
  const dial = new THREE.Mesh(
    new THREE.CylinderGeometry(0.66, 0.66, 0.03, 64),
    dialMat
  );
  dial.rotation.x = Math.PI / 2;
  dial.position.z = 0.085;
  group.add(dial);
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const marker = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.025, 8),
      handMat
    );
    marker.position.set(Math.sin(angle) * 0.54, Math.cos(angle) * 0.54, 0.115);
    marker.rotation.x = Math.PI / 2;
    group.add(marker);
  }
  const hourHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.045, 0.3, 0.018),
    handMat
  );
  hourHand.position.set(0.05, 0.12, 0.135);
  hourHand.rotation.z = -0.5;
  group.add(hourHand);
  const minHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.032, 0.45, 0.016),
    handMat
  );
  minHand.position.set(-0.05, 0.17, 0.15);
  minHand.rotation.z = 0.9;
  group.add(minHand);
  const secHand = new THREE.Mesh(
    new THREE.BoxGeometry(0.014, 0.5, 0.01),
    accentMat
  );
  secHand.position.set(0.02, 0.2, 0.16);
  secHand.rotation.z = -1.2;
  group.add(secHand);
  const jewel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.025, 16),
    accentMat
  );
  jewel.rotation.x = Math.PI / 2;
  jewel.position.z = 0.165;
  group.add(jewel);
  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.055, 0.2, 16),
    caseMat
  );
  crown.rotation.z = Math.PI / 2;
  crown.position.set(0.78, -0.05, 0);
  group.add(crown);
  const crystal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.7, 0.04, 64),
    crystalMat
  );
  crystal.rotation.x = Math.PI / 2;
  crystal.position.z = 0.165;
  group.add(crystal);
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function LandingWatch({ scrollProgress }: LandingWatchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const animRef = useRef<number>(0);
  const scrollRef = useRef(0);
  const autoRotateY = useRef(0);

  // Keep scrollRef current without triggering re-renders
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth || 800;
    const H = canvas.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0, 9);
    cameraRef.current = camera;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xfff5e8, 2.0);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xc4a882, 0.8);
    rim.position.set(-5, 2, -3);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xe8f0ff, 0.5);
    fill.position.set(0, -4, 3);
    scene.add(fill);

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    if (HAS_GLB) {
      const loader = new GLTFLoader();
      loader.load(
        "/watch.glb",
        (gltf) => {
          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2.0 / maxDim;
          model.position.sub(center);
          model.scale.setScalar(scale);
          group.add(model);
        },
        undefined,
        (error) => {
          console.warn("GLB failed, using fallback:", error);
          buildFallbackWatch(group);
        }
      );
    } else {
      buildFallbackWatch(group);
    }

    const tick = () => {
      animRef.current = requestAnimationFrame(tick);
      const s = Math.min(1, Math.max(0, scrollRef.current));
      const eased = easeInOut(s);

      // Auto-spin slows to a stop as you scroll down
      // Full speed at s=0, completely stopped by s=0.67
      const spinSpeed = Math.max(0, lerp(0.004, 0, s * 1.5));
      autoRotateY.current += spinSpeed;

      // Y: blend from spinning angle toward 0 (front-facing)
      group.rotation.y = lerp(autoRotateY.current % (Math.PI * 2), 0, eased);

      // X: slight tilt at top, perfectly level at bottom
      group.rotation.x = lerp(0.15, 0, eased);

      // Camera: zoom from far to close
      camera.position.z = lerp(9, 3.2, eased);
      camera.position.y = lerp(0, 0.6, eased);
      //camera.lookAt(0, 0, 0);
      const lookY = lerp(0, 1.01, eased); // at full scroll, look 0.8 units up
      camera.lookAt(0, lookY, 0);
      renderer.render(scene, camera);
    };
    tick();

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const onResize = () => {
      // Debounce: wait 60ms after the last resize event before updating
      // This batches rapid resize events into a single update
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const parent = canvas.parentElement;
        const w = parent ? parent.clientWidth : window.innerWidth;
        const h = parent ? parent.clientHeight : window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 60);
    };

    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(canvas.parentElement || canvas);
    onResize();

    return () => {
      cancelAnimationFrame(animRef.current);
      clearTimeout(resizeTimeout); // ← add this line
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "block",
        zIndex: 1,
      }}
    />
  );
}
