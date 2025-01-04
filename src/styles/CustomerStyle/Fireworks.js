import React, { useEffect, useRef } from 'react';

const Fireworks = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match its parent
    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles = [];
    const colors = ['#FFD700', '#FFFFFF', '#DAA520', '#FF4500', '#FF8C00'];
    const random = (min, max) => Math.random() * (max - min) + min;

    // Particle class with enhanced styles
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = random(-1.5, 1.5); // Slower horizontal velocity
        this.vy = random(-1.5, 1.5); // Slower vertical velocity
        this.opacity = 1;
        this.size = random(1.5, 3.5); // Larger particle size
        this.color = color;
        this.trail = []; // Store previous positions for trail effect
        this.trailLength = random(10, 20); // Trail length
      }

      update() {
        if (this.trail.length >= this.trailLength) {
          this.trail.shift(); // Remove the oldest trail point to maintain length
        }
        this.trail.push({ x: this.x, y: this.y });

        this.x += this.vx * 0.7; // Slower movement
        this.y += this.vy * 0.7; // Slower movement
        this.opacity -= 0.005; // Slower fade-out
      }

      draw() {
        // Draw the trail
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        for (let i = 0; i < this.trail.length - 1; i++) {
          const start = this.trail[i];
          const end = this.trail[i + 1];
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
        }
        ctx.stroke();

        // Draw the particle
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const createParticle = (x, y, color) => {
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    const updateParticles = () => {
      particles.forEach((p, index) => {
        p.update();
        if (p.opacity <= 0) particles.splice(index, 1); // Remove faded particles
      });
    };

    const drawParticles = () => {
      // Red background for the category header
      ctx.fillStyle = '#FF0000'; // Bright red background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => p.draw());
    };

    const loop = () => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(loop);
    };

    // Create random fireworks within the category header
    const createRandomFireworks = () => {
      const rect = canvas.getBoundingClientRect();
      const x = random(0, rect.width);
      const y = random(0, rect.height);
      const color = colors[Math.floor(Math.random() * colors.length)];
      createParticle(x, y, color);
    };

    const interval = setInterval(createRandomFireworks, 700); // Slower fireworks spawn
    loop();

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Ensure it appears behind the text
        pointerEvents: 'none',
      }}
    />
  );
};

export default Fireworks;