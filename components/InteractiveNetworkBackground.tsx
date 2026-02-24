import React, { useEffect, useRef } from 'react';

type NodePoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

const InteractiveNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let linkDistance = 150;
    let interactionRadius = 220;
    let nodes: NodePoint[] = [];

    const mouse = {
      x: Number.NaN,
      y: Number.NaN,
      active: false,
    };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    const nodeCountForViewport = () => {
      const density = width < 768 ? 0.00005 : 0.000065;
      const count = Math.floor(width * height * density);
      return Math.max(30, Math.min(110, count));
    };

    const createNodes = (count: number): NodePoint[] =>
      Array.from({ length: count }, () => ({
        x: random(0, width),
        y: random(0, height),
        vx: random(-0.28, 0.28),
        vy: random(-0.28, 0.28),
        size: random(1.1, 2.8),
      }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      linkDistance = width < 768 ? 105 : 155;
      interactionRadius = width < 768 ? 140 : 220;
      nodes = createNodes(nodeCountForViewport());
    };

    const drawBackground = () => {
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#010a22');
      gradient.addColorStop(1, '#020617');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
    };

    const updateNodePositions = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
        }

        if (node.y <= 0 || node.y >= height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(height, node.y));
        }

        if (mouse.active) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < interactionRadius && distance > 0.001) {
            const force = (interactionRadius - distance) / interactionRadius;
            const intensity = force * force * 1.8;
            node.x += (dx / distance) * intensity;
            node.y += (dy / distance) * intensity;
          }
        }
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);

          if (distance > linkDistance) continue;

          const baseAlpha = (1 - distance / linkDistance) * 0.42;
          let mouseBoost = 0;

          if (mouse.active) {
            const aMouseDistance = Math.hypot(a.x - mouse.x, a.y - mouse.y);
            const bMouseDistance = Math.hypot(b.x - mouse.x, b.y - mouse.y);
            const nearest = Math.min(aMouseDistance, bMouseDistance);

            if (nearest < interactionRadius) {
              mouseBoost = (1 - nearest / interactionRadius) * 0.45;
            }
          }

          const alpha = Math.min(baseAlpha + mouseBoost, 0.78);
          if (alpha <= 0.02) continue;

          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          context.lineWidth = 0.6 + mouseBoost * 1.4;
          context.stroke();
        }
      }
    };

    const drawNodes = () => {
      for (const node of nodes) {
        let highlight = 0;

        if (mouse.active) {
          const mouseDistance = Math.hypot(node.x - mouse.x, node.y - mouse.y);
          if (mouseDistance < interactionRadius) {
            highlight = 1 - mouseDistance / interactionRadius;
          }
        }

        const radius = node.size + highlight * 1.3;
        const alpha = 0.52 + highlight * 0.42;

        context.beginPath();
        context.arc(node.x, node.y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(37, 99, 235, ${alpha})`;
        context.fill();
      }
    };

    const animate = () => {
      drawBackground();
      updateNodePositions();
      drawConnections();
      drawNodes();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
        return;
      }

      if (!animationFrameId) {
        animate();
      }
    };

    resize();
    animate();

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeave);
    document.addEventListener('mouseleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      window.removeEventListener('blur', onPointerLeave);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
};

export default InteractiveNetworkBackground;
