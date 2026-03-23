"use client";

// WatchScene.tsx
// This is the reusable 3D watch renderer.
// It gets used on the landing page (with scroll zoom)
// AND inside the builder (with part swapping).
// "use client" is required because Three.js uses browser APIs
// that don't exist on the server during Next.js rendering.

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { WatchBuild } from "@/types/watch";
import { PARTS } from "@/lib/watchData";

interface WatchSceneProps {
  build: WatchBuild;
  // scrollProgress: 0 (top of page) → 1 (zoomed in)
  // Only used on the landing page. Builder passes undefined.
  scrollProgress?: number;
  interactive?: boolean; // enables drag-to-rotate
  className?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hexToColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

// Builds all the watch meshes and adds them to the group.
// Called once on mount, then again whenever the build changes.
function buildWatchMeshes(group: THREE.Group, build: WatchBuild) {
  // Clear any previously built meshes
  while (group.children.length > 0) {
    const child = group.children[0] as THREE.Mesh;
    if (child.geometry) child.geometry.dispose();
    group.remove(child);
  }

  // Look up the selected option for each part
  const caseOpt = PARTS.case.options.find((o) => o.id === build.case)!;
  const dialOpt = PARTS.dial.options.find((o) => o.id === build.dial)!;
  const handsOpt = PARTS.hands.options.find((o) => o.id === build.hands)!;
  const strapOpt = PARTS.strap.options.find((o) => o.id === build.strap)!;
  const crystalOpt = PARTS.crystal.options.find((o) => o.id === build.crystal)!;

  // ── Materials ──
  const caseMat = new THREE.MeshStandardMaterial({
    color: hexToColor(caseOpt.hex),
    metalness: 0.88,
    roughness: 0.2,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: hexToColor(dialOpt.hex),
    metalness: 0.1,
    roughness: 0.55,
  });
  const handsMat = new THREE.MeshStandardMaterial({
    color: hexToColor(handsOpt.hex),
    metalness: 0.95,
    roughness: 0.1,
  });
  const strapMat = new THREE.MeshStandardMaterial({
    color: hexToColor(strapOpt.hex),
    metalness: 0.02,
    roughness: 0.85,
  });
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: hexToColor(crystalOpt.hex),
    transparent: true,
    opacity: 0.25,
    roughness: 0,
    metalness: 0,
    transmission: 0.7,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0xcc3333,
    metalness: 0.8,
    roughness: 0.15,
  });

  // ── Strap (top and bottom) ──
  const strapGeo = new THREE.BoxGeometry(0.55, 0.72, 0.09);
  const strapTop = new THREE.Mesh(strapGeo, strapMat);
  strapTop.position.set(0, 0.95, -0.04);
  group.add(strapTop);

  const strapBot = new THREE.Mesh(strapGeo, strapMat);
  strapBot.position.set(0, -0.95, -0.04);
  group.add(strapBot);

  // ── Case body ──
  const caseGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.22, 64);
  const caseBody = new THREE.Mesh(caseGeo, caseMat);
  caseBody.rotation.x = Math.PI / 2;
  caseBody.castShadow = true;
  group.add(caseBody);

  // ── Bezel ring (front lip) ──
  const bezelGeo = new THREE.TorusGeometry(0.72, 0.055, 16, 64);
  const bezel = new THREE.Mesh(bezelGeo, caseMat);
  bezel.position.z = 0.11;
  group.add(bezel);

  // ── Back ring ──
  const backRingGeo = new THREE.TorusGeometry(0.72, 0.04, 16, 64);
  const backRing = new THREE.Mesh(backRingGeo, caseMat);
  backRing.position.z = -0.11;
  group.add(backRing);

  // ── Dial face ──
  const dialGeo = new THREE.CylinderGeometry(0.66, 0.66, 0.03, 64);
  const dial = new THREE.Mesh(dialGeo, dialMat);
  dial.rotation.x = Math.PI / 2;
  dial.position.z = 0.085;
  group.add(dial);

  // ── Hour markers (12 small cylinders around the dial) ──
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const markerGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.025, 8);
    const marker = new THREE.Mesh(markerGeo, handsMat);
    marker.position.set(Math.sin(angle) * 0.54, Math.cos(angle) * 0.54, 0.115);
    marker.rotation.x = Math.PI / 2;
    group.add(marker);
  }

  // ── Hour hand ──
  const hourGeo = new THREE.BoxGeometry(0.045, 0.3, 0.018);
  const hourHand = new THREE.Mesh(hourGeo, handsMat);
  hourHand.position.set(0.05, 0.12, 0.135);
  hourHand.rotation.z = -0.5;
  group.add(hourHand);

  // ── Minute hand ──
  const minGeo = new THREE.BoxGeometry(0.032, 0.45, 0.016);
  const minHand = new THREE.Mesh(minGeo, handsMat);
  minHand.position.set(-0.05, 0.17, 0.15);
  minHand.rotation.z = 0.9;
  group.add(minHand);

  // ── Seconds hand (red accent) ──
  const secGeo = new THREE.BoxGeometry(0.014, 0.5, 0.01);
  const secHand = new THREE.Mesh(secGeo, accentMat);
  secHand.position.set(0.02, 0.2, 0.16);
  secHand.rotation.z = -1.2;
  group.add(secHand);

  // ── Center jewel ──
  const jewGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.025, 16);
  const jewel = new THREE.Mesh(jewGeo, accentMat);
  jewel.rotation.x = Math.PI / 2;
  jewel.position.z = 0.165;
  group.add(jewel);

  // ── Crown (the little side knob) ──
  const crownGeo = new THREE.CylinderGeometry(0.045, 0.055, 0.2, 16);
  const crown = new THREE.Mesh(crownGeo, caseMat);
  crown.rotation.z = Math.PI / 2;
  crown.position.set(0.78, -0.05, 0);
  group.add(crown);

  // ── Crystal (glass face) ──
  const crystalGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.04, 64);
  const crystal = new THREE.Mesh(crystalGeo, crystalMat);
  crystal.rotation.x = Math.PI / 2;
  crystal.position.z = 0.165;
  group.add(crystal);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WatchScene({
  build,
  scrollProgress = 0,
  interactive = true,
  className = "",
}: WatchSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // We store refs to Three.js objects so the animation loop
  // can access them without re-running the setup effect.
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const watchGroupRef = useRef<THREE.Group | null>(null);
  const animRef = useRef<number>(0);

  // Drag state
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0.2, y: 0 });
  const autoRotate = useRef(true);

  // ── Scene setup (runs once on mount) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.clientWidth || 800;
    const H = canvas.clientHeight || 600;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Scene
    const scene = new THREE.Scene();

    // Camera — starts far away for landing page zoom effect
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 4.5);
    cameraRef.current = camera;

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff8f0, 1.8);
    key.position.set(3, 5, 4);
    key.castShadow = true;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xc9a84c, 0.6);
    rim.position.set(-4, 2, -3);
    scene.add(rim);

    const fill = new THREE.DirectionalLight(0x8090c0, 0.4);
    fill.position.set(0, -3, 2);
    scene.add(fill);

    // Watch group — all meshes go inside here
    const group = new THREE.Group();
    watchGroupRef.current = group;
    scene.add(group);
    buildWatchMeshes(group, build);

    // Animation loop
    const tick = () => {
      animRef.current = requestAnimationFrame(tick);

      // Spin automatically, but let drag override it
      if (autoRotate.current) {
        rotation.current.y += 0.004;
      }

      group.rotation.x = rotation.current.x;
      group.rotation.y = rotation.current.y;

      renderer.render(scene, camera);
    };
    tick();

    // Drag handlers (only if interactive)
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging.current = true;
      autoRotate.current = false;
      const pos = "touches" in e ? e.touches[0] : e;
      lastMouse.current = { x: pos.clientX, y: pos.clientY };
    };
    const onUp = () => {
      isDragging.current = false;
      // Resume auto-rotate after 2 seconds of no interaction
      setTimeout(() => {
        autoRotate.current = true;
      }, 2000);
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const pos = "touches" in e ? e.touches[0] : e;
      rotation.current.y += (pos.clientX - lastMouse.current.x) * 0.008;
      rotation.current.x += (pos.clientY - lastMouse.current.y) * 0.006;
      // Clamp vertical rotation so it doesn't flip upside down
      rotation.current.x = Math.max(-1, Math.min(1, rotation.current.x));
      lastMouse.current = { x: pos.clientX, y: pos.clientY };
    };

    canvas.addEventListener("mousedown", onDown as EventListener);
    canvas.addEventListener("touchstart", onDown as EventListener);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    window.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("touchmove", onMove as EventListener);

    // Resize handler
    const onResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Cleanup when component unmounts
    return () => {
      cancelAnimationFrame(animRef.current);
      renderer.dispose();
      canvas.removeEventListener("mousedown", onDown as EventListener);
      canvas.removeEventListener("touchstart", onDown as EventListener);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array = run once on mount only

  // ── Rebuild watch when build changes ──
  useEffect(() => {
    if (!watchGroupRef.current) return;
    buildWatchMeshes(watchGroupRef.current, build);
  }, [build]);

  // ── Scroll zoom: move camera closer as user scrolls ──
  // scrollProgress 0 = far away (z: 9), 1 = close up (z: 3.5)
  useEffect(() => {
    if (!cameraRef.current) return;
    const farZ = 9;
    const closeZ = 3.5;
    // Lerp between far and close based on scroll progress
    cameraRef.current.position.z = farZ - (farZ - closeZ) * scrollProgress;
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ cursor: interactive ? "grab" : "default", touchAction: "none" }}
    />
  );
}
