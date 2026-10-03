"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroWeight() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(max-width: 900px)").matches) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const palette = getComputedStyle(document.documentElement);
    const navy = palette.getPropertyValue("--navy").trim();
    const red = palette.getPropertyValue("--red").trim();
    const white = palette.getPropertyValue("--white").trim();
    const dumbbell = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: navy, roughness: 0.48, metalness: 0.52, flatShading: true });
    const accent = new THREE.MeshStandardMaterial({ color: red, roughness: 0.5, metalness: 0.25, flatShading: true });
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 4.2, 10), material);
    bar.rotation.z = Math.PI / 2;
    dumbbell.add(bar);

    [-1.65, -1.25, 1.25, 1.65].forEach((x, index) => {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(index % 2 ? 0.85 : 1.02, index % 2 ? 0.85 : 1.02, 0.34, 10), index % 2 ? accent : material);
      plate.rotation.z = Math.PI / 2;
      plate.position.x = x;
      dumbbell.add(plate);
    });
    dumbbell.rotation.set(-0.35, 0.45, -0.2);
    scene.add(dumbbell);

    const key = new THREE.DirectionalLight(white, 3.2);
    key.position.set(4, 6, 7);
    scene.add(key);
    const fill = new THREE.DirectionalLight(red, 1.8);
    fill.position.set(-4, -2, 4);
    scene.add(fill);
    scene.add(new THREE.AmbientLight(white, 1.25));

    let active = true;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; }, { threshold: 0.05 });
    observer.observe(mount);

    const draw = () => {
      frame = window.requestAnimationFrame(draw);
      if (!active) return;
      if (!reduceMotion) {
        dumbbell.rotation.y += 0.0045;
        dumbbell.rotation.x = -0.35 + Math.sin(performance.now() * 0.0007) * 0.08;
      }
      renderer.render(scene, camera);
    };
    draw();

    const resize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      material.dispose();
      accent.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-weight" aria-hidden="true" />;
}
