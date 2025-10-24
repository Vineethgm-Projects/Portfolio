import React, { useEffect, useRef } from "react";
import "./GridBackground.css";

export default function GridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const config = {
      gridSize: 40,
      gridColor: "#1a1a1a", // 🔹 Duller grid lines for better contrast with text
      particleCount: 50,
      particleSpeedMin: 0.5,
      particleSpeedMax: 5,
      particleColors: ["#cccccc", "#999999", "#777777"], // Slightly duller particle colors
      trailLength: 100,
      backgroundColor: "#000000", // pure black background
      rippleDuration: 2000,
      rippleMaxRadius: 200,
    };

    const occupiedLines = { horizontal: new Set(), vertical: new Set() };

    function createGrid() {
      ctx.fillStyle = config.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 🔹 Adjusted gradient for duller lines
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(30, 30, 30, 0.8)"); // Softer grey for gradient start
      gradient.addColorStop(1, "rgba(30, 30, 30, 0.2)"); // Softer grey for gradient end
      ctx.strokeStyle = gradient;

      for (let y = 0; y < canvas.height; y += config.gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      for (let x = 0; x < canvas.width; x += config.gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    }

    class Particle {
      constructor() {
        this.color =
          config.particleColors[Math.floor(Math.random() * config.particleColors.length)];
        this.speed =
          Math.random() *
            (config.particleSpeedMax - config.particleSpeedMin) +
          config.particleSpeedMin;
        this.reset();
      }

      reset() {
        this.direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        this.active = true;
        this.trail = [];
        if (this.direction === "horizontal") {
          this.x = 0;
          this.y = Math.floor(Math.random() * (canvas.height / config.gridSize)) * config.gridSize;
          occupiedLines.horizontal.add(this.y);
        } else {
          this.x = Math.floor(Math.random() * (canvas.width / config.gridSize)) * config.gridSize;
          this.y = 0;
          occupiedLines.vertical.add(this.x);
        }
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > config.trailLength) this.trail.shift();

        if (this.active) {
          if (this.direction === "horizontal") {
            this.x += this.speed;
            if (this.x > canvas.width) {
              this.active = false;
              occupiedLines.horizontal.delete(this.y);
            }
          } else {
            this.y += this.speed;
            if (this.y > canvas.height) {
              this.active = false;
              occupiedLines.vertical.delete(this.x);
            }
          }
        } else {
          const offScreen = this.trail.every(
            (p) =>
              (this.direction === "horizontal" && p.x > canvas.width) ||
              (this.direction === "vertical" && p.y > canvas.height)
          );
          if (offScreen) this.reset();
        }
      }

      draw() {
        for (let i = 0; i < this.trail.length - 1; i++) {
          const p1 = this.trail[i];
          const p2 = this.trail[i + 1];
          const alpha = i / this.trail.length;
          ctx.strokeStyle = this.color;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    }

    const particles = Array.from({ length: config.particleCount }, () => new Particle());

    function animate() {
      createGrid();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas id="gridCanvas" ref={canvasRef}></canvas>;
}