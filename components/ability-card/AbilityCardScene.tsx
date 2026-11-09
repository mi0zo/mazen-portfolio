"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Dictionary } from "@/lib/dictionary";
import { AbilityCardFallback } from "./AbilityCardFallback";

interface AbilityCardSceneProps {
  dict: Dictionary;
}

export function AbilityCardScene({ dict }: AbilityCardSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const [loadingPct, setLoadingPct] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Verify WebGL support
    const canvasTest = document.createElement("canvas");
    const gl = canvasTest.getContext("webgl2") || canvasTest.getContext("webgl");
    if (!gl) {
      setHasError(true);
      return;
    }

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let cardGroup: THREE.Group;
    let rafId = 0;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 500;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 16;

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff2d6, 2.5);
    dirLight.position.set(5, 8, 10);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0xa4552c, 3, 20);
    rimLight.position.set(-6, -4, 6);
    scene.add(rimLight);

    cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // Card dimensions: ratio 6.3 x 8.8
    const cardW = 6.3;
    const cardH = 8.8;

    const textureLoader = new THREE.TextureLoader();
    let loadedCount = 0;
    const totalTex = 4;

    const onTexLoad = () => {
      loadedCount++;
      setLoadingPct(Math.round((loadedCount / totalTex) * 100));
    };

    const frontTex = textureLoader.load("/card/plate.webp", onTexLoad);
    const backTex = textureLoader.load("/card/back.webp", onTexLoad);
    const winBgTex = textureLoader.load("/card/win_bg.webp", onTexLoad);
    const winSubTex = textureLoader.load("/card/win_sub.webp", onTexLoad);

    // Front Card Mesh
    const frontGeo = new THREE.PlaneGeometry(cardW, cardH);
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex,
      metalness: 0.35,
      roughness: 0.45,
      side: THREE.FrontSide,
    });
    const frontMesh = new THREE.Mesh(frontGeo, frontMat);
    cardGroup.add(frontMesh);

    // Inner Scenery Plane
    const winGeo = new THREE.PlaneGeometry(cardW * 0.82, cardH * 0.45);
    const winMat = new THREE.MeshStandardMaterial({
      map: winBgTex,
      metalness: 0.1,
      roughness: 0.8,
    });
    const winMesh = new THREE.Mesh(winGeo, winMat);
    winMesh.position.set(0, 1.2, 0.05);
    cardGroup.add(winMesh);

    // Character Silhouette cutout plane
    const subGeo = new THREE.PlaneGeometry(cardW * 0.75, cardH * 0.45);
    const subMat = new THREE.MeshStandardMaterial({
      map: winSubTex,
      transparent: true,
      metalness: 0.2,
      roughness: 0.5,
    });
    const subMesh = new THREE.Mesh(subGeo, subMat);
    subMesh.position.set(0, 1.2, 0.1);
    cardGroup.add(subMesh);

    // Back Card Mesh
    const backGeo = new THREE.PlaneGeometry(cardW, cardH);
    const backMat = new THREE.MeshStandardMaterial({
      map: backTex,
      metalness: 0.75,
      roughness: 0.25,
      side: THREE.BackSide,
    });
    const backMesh = new THREE.Mesh(backGeo, backMat);
    cardGroup.add(backMesh);

    // Drag and Orbit State
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let velY = 0;
    let velX = 0;

    function onPointerDown(e: PointerEvent) {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velX = 0;
      velY = 0;
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging) {
        // Idle tilt based on cursor position
        const rect = container!.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        dirLight.position.x = 5 + nx * 6;
        dirLight.position.y = 8 - ny * 6;
        return;
      }
      const dx = e.clientX - prevPointerX;
      const dy = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      velY = dx * 0.012;
      velX = dy * 0.012;

      targetRotY += velY;
      targetRotX += velX;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
    }

    function onPointerUp() {
      isDragging = false;
    }

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    function onResize() {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    // Animation Loop
    function animate() {
      rafId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Inertia dissipation
        velY *= 0.94;
        velX *= 0.94;
        targetRotY += velY;
        targetRotX += velX;

        // Auto snap to nearest face when velocity settles
        if (Math.abs(velY) < 0.002) {
          const mod = ((targetRotY % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
          const nearestFace = mod > Math.PI * 0.5 && mod < Math.PI * 1.5 ? Math.PI : 0;
          targetRotY = THREE.MathUtils.lerp(targetRotY, Math.round(targetRotY / Math.PI) * Math.PI, 0.08);
          targetRotX = THREE.MathUtils.lerp(targetRotX, 0, 0.08);
        }
      }

      // Smooth interpolation
      cardGroup.rotation.y = THREE.MathUtils.lerp(cardGroup.rotation.y, targetRotY, 0.15);
      cardGroup.rotation.x = THREE.MathUtils.lerp(cardGroup.rotation.x, targetRotX, 0.15);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (hasError) {
    return <AbilityCardFallback dict={dict} />;
  }

  return (
    <div className="relative w-full h-[520px] md:h-[600px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      {/* Loading Progress */}
      {loadingPct < 100 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-background/50 backdrop-blur-sm">
          <p className="font-semibold text-xs text-foreground tracking-wider uppercase">
            {dict.abilityCard.loading}
          </p>
          <div className="w-36 h-1 rounded-full bg-line overflow-hidden">
            <div
              className="h-full bg-secondary transition-all duration-300"
              style={{ width: `${loadingPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Three.js Canvas Mount */}
      <div ref={mountRef} className="w-full h-full flex items-center justify-center" />
    </div>
  );
}

