import React, { useEffect, useRef } from 'react';

const HeartsAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions based on category header size
    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let hearts = [];
    const colors = ['#FF69B4', '#FF1493', '#D63384', '#C2185B', '#E52B50']; // Valentine pinks

    const random = (min, max) => Math.random() * (max - min) + min;

    // Draw heart shape function
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
        this.x = random(30, canvas.width - 30);
        this.y = canvas.height; // Start from the bottom
        this.size = random(25, 25); // Increase heart size
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speed = random(0.3, 0.4); // Slow, smooth floating
        this.opacity = 1;
        this.lifetime = random(250, 400); // Shorter lifespan for better visibility
      }

      update() {
        this.y -= this.speed; // Move up slowly
        this.lifetime -= 1;

        if (this.lifetime < 100) {
          this.opacity -= 0.01; // Slower fade-out
        }
      }

      draw() {
        drawHeart(this.x, this.y, this.size, this.color, this.opacity);
      }
    }

    const createHeart = () => {
      if (hearts.length < 10) {
        // Reduce the number of hearts for better visibility
        hearts.push(new Heart());
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();
        if (heart.opacity <= 0 || heart.y < -30) {
          hearts.splice(index, 1);
        }
      });

      requestAnimationFrame(update);
    };

    setInterval(createHeart, 700); // Less frequent heart spawn
    update();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%', // Ensures consistent effect
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default HeartsAnimation;