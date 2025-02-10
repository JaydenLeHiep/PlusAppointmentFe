import React, { useEffect, useRef } from 'react';

const HeartAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Ensure canvas covers the screen
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight; // Only affects the background, NOT heart movement
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let hearts = [];
    const colors = ['#FF004D', '#D00050', '#C70039', '#FF3366', '#FF1493'];

    const random = (min, max) => Math.random() * (max - min) + min;

    // 🎨 Heart shape drawing function
    const drawHeart = (x, y, size, color, opacity) => {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
      ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
      ctx.fill();
      ctx.globalAlpha = 1; // Reset opacity
    };

    class Heart {
      constructor() {
        this.x = random(50, canvas.width - 50);
        this.y = window.innerHeight; // Always start from the bottom
        this.size = random(30, 45);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = random(0.6, 1.2); // Controlled floating speed
        this.opacity = 1;
        this.lifetime = random(500, 800); // How long it stays visible
        this.fixedFlyHeight = 500; // **💖 Fixed height for heart flight**
        this.startY = this.y; // Store the initial position
      }

      update() {
        this.y -= this.speed; // Move up smoothly
        this.lifetime -= 1;

        // 🛑 **Force fade-out when reaching fixed height**
        if (this.startY - this.y >= this.fixedFlyHeight) {
          this.opacity -= 0.02; // Gradual fade-out
        }

        // Ensure proper fading before removal
        if (this.opacity <= 0) {
          this.opacity = 0;
        }
      }

      draw() {
        drawHeart(this.x, this.y, this.size, this.color, this.opacity);
      }
    }

    const createHeart = () => {
      hearts.push(new Heart());
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
        if (heart.opacity <= 0) {
          hearts.splice(index, 1); // Remove fully faded hearts
        }
      });

      requestAnimationFrame(update);
    };

    setInterval(createHeart, 300); // Frequent heart creation
    update();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0, // Cover full screen
        left: 0,
        width: '100%',
        height: '100%', // Full background but hearts are independent
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default HeartAnimation;