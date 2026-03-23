"use client";

// LandingWatch.tsx
//
// This component handles the landing page 3D watch.
// It supports two modes:
//   1. GLB mode  — loads a real .glb model file from /public/watch.glb
//   2. Fallback  — renders the geometric Three.js watch if no GLB is found
//
// HOW TO ADD YOUR OWN GLB MODEL:
//   1. Download a free watch .glb from sketchfab.com (instructions below)
//   2. Rename the file to "watch.glb"
//   3. Place it in your /public folder
//   4. Set HAS_GLB = true below
//
// FINDING A FREE WATCH MODEL ON SKETCHFAB:
//   1. Go to sketchfab.com
//   2. Search "wristwatch" or "luxury watch"
//   3. Filter by: Free, Downloadable
//   4. Look for models with a "Download" button
//   5. Download as GLB format
//   6. Good search terms: "watch 3d model free", "wristwatch glb free"
//
// IMPORTANT: Only use models with a Creative Commons or free license.
// Good free options: search "watch" on poly.pizza too (always free).

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// ─── Toggle this to true once you've added watch.glb to /public ───────────────
const HAS_GLB = true;

interface LandingWatchProps {
  scrollProgress: number; // 0 = page top, 1 = scrolled down
}

// Fallback geometric watch — same as WatchScene but tuned for landing
function buildFallbackWatch(group: THREE.Group) {
  while (group.children.length > 0) {
    group.remove(group.children[0]);
  }

  // Materials — slightly warmer to match light theme
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

  // Straps
  const strapGeo = new THREE.BoxGeometry(0.55, 0.75, 0.09);
  const st = new THREE.Mesh(strapGeo, strapMat);
  st.position.set(0, 0.96, -0.04);
  group.add(st);
  const sb = new THREE.Mesh(strapGeo, strapMat);
  sb.position.set(0, -0.96, -0.04);
  group.add(sb);

  // Case
  const caseGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.22, 64);
  const caseBody = new THREE.Mesh(caseGeo, caseMat);
  caseBody.rotation.x = Math.PI / 2;
  group.add(caseBody);

  // Bezel
  const bezelGeo = new THREE.TorusGeometry(0.72, 0.055, 16, 64);
  const bezel = new THREE.Mesh(bezelGeo, caseMat);
  bezel.position.z = 0.11;
  group.add(bezel);

  // Back ring
  const backRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.72, 0.04, 16, 64),
    caseMat
  );
  backRing.position.z = -0.11;
  group.add(backRing);

  // Dial
  const dial = new THREE.Mesh(
    new THREE.CylinderGeometry(0.66, 0.66, 0.03, 64),
    dialMat
  );
  dial.rotation.x = Math.PI / 2;
  dial.position.z = 0.085;
  group.add(dial);

  // Hour markers
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

  // Hands
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

  // Center jewel
  const jewel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.025, 16),
    accentMat
  );
  jewel.rotation.x = Math.PI / 2;
  jewel.position.z = 0.165;
  group.add(jewel);

  // Crown
  const crown = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.055, 0.2, 16),
    caseMat
  );
  crown.rotation.z = Math.PI / 2;
  crown.position.set(0.78, -0.05, 0);
  group.add(crown);

  // Crystal
  const crystal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.7, 0.04, 64),
    crystalMat
  );
  crystal.rotation.x = Math.PI / 2;
  crystal.position.z = 0.165;
  group.add(crystal);
}

export default function LandingWatch({ scrollProgress }: LandingWatchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animRef = useRef<number>(0);
  const rotationY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth || 800;
    const H = canvas.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true, // transparent background so the page bg shows through
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.setClearColor(0x000000, 0); // 0 alpha = fully transparent

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.z = 9; // starts far — scrollProgress brings it closer
    cameraRef.current = camera;

    // Lighting tuned for light background — softer, warmer
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));

    const key = new THREE.DirectionalLight(0xfff5e8, 2.0);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xc4a882, 0.8);
    rim.position.set(-5, 2, -3);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0xe8f0ff, 0.5);
    fill.position.set(0, -4, 3);
    scene.add(fill);

    const group = new THREE.Group();
    scene.add(group);

    if (HAS_GLB) {
      console.log("GLB mode is ON — attempting to load watch.glb");
      const loader = new GLTFLoader();
      console.log("GLTFLoader created:", loader);
      loader.load(
        "/watch.glb",
        (gltf) => {
          console.log("GLB loaded successfully!", gltf);
          const model = gltf.scene;

          // Auto-center and scale to fit the scene
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2.0 / maxDim;

          model.position.sub(center);
          model.scale.setScalar(scale);
          group.add(model);
        },
        (progress) => {
          // Optional: log loading progress in browser console
          console.log(
            "Loading:",
            Math.round((progress.loaded / progress.total) * 100) + "%"
          );
        },
        (error) => {
          console.warn("GLB failed, using fallback:", error);
          buildFallbackWatch(group);
        }
      );
    } else {
      console.log("HAS_GLB is false — using fallback");
      buildFallbackWatch(group);
    }

    // Animation loop — slow auto-spin
    const tick = () => {
      animRef.current = requestAnimationFrame(tick);
      rotationY.current += 0.004;
      group.rotation.y = rotationY.current;
      group.rotation.x = 0.15; // slight tilt so you can see the dial
      renderer.render(scene, camera);
    };
    tick();

    // Resize
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      renderer.dispose();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Scroll zoom: 0 = far (z:9), 1 = close (z:3.2)
  useEffect(() => {
    if (!cameraRef.current) return;
    const far = 9;
    const close = 3.2;
    cameraRef.current.position.z = far - (far - close) * scrollProgress;
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
