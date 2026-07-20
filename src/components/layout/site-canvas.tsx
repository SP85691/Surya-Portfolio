"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

const CONNECTION_DISTANCE = 120;
const LINE_COLOR = "rgba(163, 230, 53, 0.08)";
const MOUSE_PARALLAX = 12;

export function SiteCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 40 : 80;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let boostTimeout: ReturnType<typeof setTimeout>;
    const nodes: Node[] = [];
    const mouse = { x: 0, y: 0 };
    let scrollBoost = 1;

    function createNodes() {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) createNodes();
    }

    function drawStatic() {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.6,
      );
      gradient.addColorStop(0, "rgba(163, 230, 53, 0.04)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      if (reducedMotion) {
        drawStatic();
        return;
      }

      for (const node of nodes) {
        node.x += node.vx * scrollBoost;
        node.y += node.vy * scrollBoost;

        const parallaxX =
          (mouse.x / width - 0.5) * MOUSE_PARALLAX + node.baseX - node.x;
        const parallaxY =
          (mouse.y / height - 0.5) * MOUSE_PARALLAX + node.baseY - node.y;
        node.x += parallaxX * 0.02;
        node.y += parallaxY * 0.02;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            ctx.globalAlpha = 1 - dist / CONNECTION_DISTANCE;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      for (const node of nodes) {
        ctx.fillStyle = "rgba(163, 230, 53, 0.3)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      if (!document.hidden) draw();
      rafId = requestAnimationFrame(loop);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleWheel = () => {
      scrollBoost = 1.8;
      clearTimeout(boostTimeout);
      boostTimeout = setTimeout(() => {
        scrollBoost = 1;
      }, 300);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(boostTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
