"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, premultipliedAlpha: false });
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(1); // Force 1:1 pixel ratio so 1px WebGL lines are visible on retina displays

    function resize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    /* --- Particle sphere with carved "wave" cutouts --- */
    const RADIUS = 2.0;
    const SAMPLES = 24000;

    function carveMask(theta: number, phi: number) {
      const w1 = Math.sin(theta * 3.1 + phi * 1.6);
      const w2 = Math.cos(theta * 2.0 - phi * 2.4);
      const w3 = Math.sin(phi * 3.0 + theta * 1.2);
      const v = w1 * 0.5 + w2 * 0.35 + w3 * 0.3;
      return v > 0.18;
    }

    const positions = [];
    const colors = [];
    const colorCyan = new THREE.Color('#2DFDF9'); // Brighter electric cyan
    const colorDeep = new THREE.Color('#052F38'); // Deeper, darker teal for extreme contrast

    for (let i = 0; i < SAMPLES; i++) {
      const y = 1 - (i / (SAMPLES - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const phi = Math.atan2(z, x) + Math.PI;
      const polar = Math.acos(y);

      if (carveMask(polar, phi)) continue;

      const jitter = 1 + (Math.random() - 0.5) * 0.01;
      positions.push(x * RADIUS * jitter, y * RADIUS * jitter, z * RADIUS * jitter);

      const w1 = Math.sin(polar * 3.1 + phi * 1.6);
      const w2 = Math.cos(polar * 2.0 - phi * 2.4);
      const w3 = Math.sin(phi * 3.0 + polar * 1.2);
      const v = w1 * 0.5 + w2 * 0.35 + w3 * 0.3;
      const edgeDist = Math.abs(v - 0.18);
      const brightness = Math.max(0, 1 - edgeDist * 5.5); // Sharper falloff for better texture

      // Boost the bright areas and use Math.pow to make the contrast pop
      const mixFactor = Math.min(1, Math.pow(brightness, 1.2) * 1.6 + Math.random() * 0.1);
      const col = colorDeep.clone().lerp(colorCyan, mixFactor);
      colors.push(col.r, col.g, col.b);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geo, mat);
    sphereGroup.add(points);

    /* --- Edge ribbon lines along the carve boundaries --- */
    function addRibbon(offsetPhi: number, offsetTheta: number, color: number, opacity: number) {
      const segs = 200;
      const pts = [];
      for (let i = 0; i <= segs; i++) {
        const t = (i / segs) * Math.PI * 2;
        const theta = Math.PI / 2 + Math.sin(t * 1.0 + offsetTheta) * 1.05;
        const phi = t + offsetPhi + Math.sin(t * 2.0) * 0.3;
        const sx = Math.sin(theta) * Math.cos(phi);
        const sy = Math.cos(theta);
        const sz = Math.sin(theta) * Math.sin(phi);
        pts.push(new THREE.Vector3(sx * RADIUS * 1.002, sy * RADIUS * 1.002, sz * RADIUS * 1.002));
      }
      const curve = new THREE.CatmullRomCurve3(pts, true);
      const curvePts = curve.getPoints(300);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePts);
      const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      return new THREE.Line(lineGeo, lineMat);
    }
    sphereGroup.add(addRibbon(0, 0, 0x6FE9EA, 0.5));
    sphereGroup.add(addRibbon(1.8, 1.1, 0x4FCFD8, 0.35));
    sphereGroup.add(addRibbon(3.6, 2.4, 0x3FB8C4, 0.3));

    // Scale the entire globe down so it doesn't get clipped by the canvas edges
    sphereGroup.scale.set(0.95, 0.95, 0.95);

    scene.add(sphereGroup);

    /* --- Outer glow sprite behind sphere removed to prevent square box artifact --- */

    /* --- Orbit rings --- */
    function makeOrbitRing(radiusX: number, radiusZ: number, rotX: number, rotY: number, rotZ: number, opacity: number) {
      const segs = 128;
      const pts = [];
      for (let i = 0; i <= segs; i++) {
        const t = (i / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(t) * radiusX, 0, Math.sin(t) * radiusZ));
      }
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const m = new THREE.LineBasicMaterial({ color: 0x2DD4D8, transparent: true, opacity });
      const ring = new THREE.LineLoop(g, m);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      ring.rotation.z = rotZ;
      return ring;
    }

    const ring1 = makeOrbitRing(3.6, 1.1, 0.25, 0.4, 0.5, 0.22);
    const ring2 = makeOrbitRing(3.9, 1.5, -0.2, -0.5, 0.9, 0.15);
    scene.add(ring1);
    scene.add(ring2);

    const travelDots: any[] = [];
    const dotGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x7CF4F2 });
    for (let i = 0; i < 2; i++) {
      const d = new THREE.Mesh(dotGeo, dotMat);
      travelDots.push({ mesh: d, offset: i * Math.PI, ring: i === 0 ? ring1 : ring2, rx: i === 0 ? 3.6 : 3.9, rz: i === 0 ? 1.1 : 1.5 });
      scene.add(d);
    }

    scene.add(new THREE.AmbientLight(0x224455, 1));

    resize();
    window.addEventListener('resize', resize);

    let t0 = performance.now();
    let frameId: number;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const t = (performance.now() - t0) / 1000;

      sphereGroup.rotation.y = t * 0.18;
      sphereGroup.rotation.x = Math.sin(t * 0.15) * 0.05;

      ring1.rotation.y += 0.0012;
      ring2.rotation.y -= 0.0009;

      travelDots.forEach(td => {
        const angle = t * 0.4 + td.offset;
        const local = new THREE.Vector3(Math.cos(angle) * td.rx, 0, Math.sin(angle) * td.rz);
        local.applyEuler(td.ring.rotation);
        td.mesh.position.copy(local);
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="sphere-canvas" style={{ width: '100%', height: '100%', display: 'block' }} />;
}
