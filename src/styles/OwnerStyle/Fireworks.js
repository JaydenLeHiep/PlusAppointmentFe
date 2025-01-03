import React, { useEffect, useRef } from 'react';

const Fireworks = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const frameRate = 60.0;
        const frameDelay = 1000.0 / frameRate;

        let clientWidth = window.innerWidth;
        let clientHeight = window.innerHeight;
        let timer = 0;
        let x = 0;
        let y = 0;

        canvas.width = clientWidth;
        canvas.height = clientHeight;

        const TimedFirework = 1500;
        let LimiterTicker = 0;
        let fireworks = [];
        let particles = [];
        let typecount = 1;
        let num = 1;
        let colorchanger = 0;

        const getAngle = (posx1, posy1, posx2, posy2) => {
            if (posx1 === posx2) return posy1 > posy2 ? 90 : 270;
            if (posy1 === posy2) return posx1 > posx2 ? 0 : 180;

            const xDist = posx1 - posx2;
            const yDist = posy1 - posy2;

            return Math.atan2(yDist, xDist) * (180 / Math.PI);
        };

        const random = (min, max, round) =>
            round === 'round'
                ? Math.round(Math.random() * (max - min) + min)
                : Math.random() * (max - min) + min;

        const colors = () => {
            if (timer > colorchanger) {
                num = random(0, 7, 'round');
                colorchanger = timer + 500;
            }
            switch (num) {
                case 1:
                    return '#FFD700'; // Bright Gold
                case 2:
                    return '#F7E7CE'; // Champagne Gold
                case 3:
                    return '#FFFFFF'; // White
                case 4:
                    return '#FFFFF0'; // Ivory
                case 5:
                    return '#E6BE8A'; // Pale Gold
                case 6:
                    return '#E5E4E2'; // Platinum
                case 7:
                    return '#DAA520'; // Goldenrod
                case 8:
                    return '#F8F8FF'; // Pearl White
                case 9:
                    return '#FFF5BA'; // Light Gold
                default:
                    return '#FFFFFF'; // White
            }
        };

        const createFirework = () => {
            const firework = new Firework();
            firework.x = firework.sx = clientWidth / 2;
            firework.y = firework.sy = clientHeight - 200;
            firework.color = colors();

            if (x !== 0 && y !== 0) {
                firework.tx = x;
                firework.ty = y;
                x = y = 0;
            } else {
                firework.tx = random(400, clientWidth - 400);
                firework.ty = random(0, clientHeight / 2);
            }

            const angle = getAngle(firework.sx, firework.sy, firework.tx, firework.ty);
            firework.vx = Math.cos(angle) * random(0.5, 1.5); // Slower horizontal velocity
            firework.vy = Math.sin(angle) * random(0.5, 1.5); // Slower vertical velocity

            fireworks.push(firework);
        };

        class Firework {
            constructor() {
                this.x = 0;
                this.y = 0;
                this.sx = 0;
                this.sy = 0;
                this.tx = 0;
                this.ty = 0;
                this.vx = 0;
                this.vy = 0;
                this.color = '#fff';
                this.speed = random(700, 1000);
                this.gravity = 1.5;
                this.ms = 0;
                this.s = 0;
                this.del = false;
            }

            update(ms) {
                this.ms = ms / 1000;

                if (this.s > 2000 / ms) {
                    createParticles(typecount, 60, this.x, this.y, this.color);
                    this.del = true;
                } else {
                    this.speed *= 0.98;
                    this.x -= this.vx * this.speed * this.ms;
                    this.y -= this.vy * this.speed * this.ms - this.gravity;
                }

                this.s++;
            }

            draw() {
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(this.x, this.y, 3, 0, 3 * Math.PI);
                ctx.fill();
            }
        }

        const createParticles = (type, count, pox, poy, color) => {
            for (let i = 0; i < count; i++) {
                const particle = new Particle();
                particle.type = type;
                particle.color = color;
                particle.x = pox;
                particle.y = poy;

                const angle = random(0, 360);
                particle.vx = Math.cos(angle * (Math.PI / 180));
                particle.vy = Math.sin(angle * (Math.PI / 180));

                particles.push(particle);
            }
        };

        class Particle {
            constructor() {
              this.x = 0;
              this.y = 0;
              this.prevX = 0; // Store the previous X position for the trail
              this.prevY = 0; // Store the previous Y position for the trail
              this.vx = 0;
              this.vy = 0;
              this.speed = random(150, 400); // Randomized speed for varied dispersion
              this.gravity = 0.4; // Smooth gravity for a natural fall
              this.opacity = 1;
              this.fadeRate = random(0.005, 0.008); // Randomized fade rate for trails
              this.trailLength = random(10, 25); // Adjust trail length
              this.trail = []; // Array to store previous positions for a longer trail
              this.color = '#fff';
            }
          
            update(ms) {
              this.ms = ms / 1000;
          
              // Save the current position to the trail
              if (this.trail.length >= this.trailLength) {
                this.trail.shift(); // Remove the oldest trail point to maintain the trail length
              }
              this.trail.push({ x: this.x, y: this.y });
          
              // Update position with speed and gravity
              this.speed *= 0.973; // Gradual slowdown
              this.x -= this.vx * this.speed * this.ms;
              this.y -= this.vy * this.speed * this.ms - this.gravity;
          
              // Fade out gradually
              if (this.opacity > 0) {
                this.opacity -= this.fadeRate; // Gradual fade-out
              }
            }
          
            draw() {
              ctx.globalAlpha = this.opacity;
          
              // Draw the trail
              ctx.strokeStyle = this.color;
              ctx.lineWidth = 2.5; // Thicker trails for visibility
              ctx.beginPath();
              for (let i = 0; i < this.trail.length - 1; i++) {
                const start = this.trail[i];
                const end = this.trail[i + 1];
                ctx.moveTo(start.x, start.y);
                ctx.lineTo(end.x, end.y);
              }
              ctx.stroke();
          
              // Draw the particle as a small dot
              ctx.fillStyle = this.color;
              ctx.beginPath();
              ctx.arc(this.x, this.y, 2.5, 0, 2 * Math.PI);
              ctx.fill();
            }
          }

        const update = () => {
            ctx.fillStyle = 'rgb(225, 0, 0)';
            ctx.fillRect(0, 0, clientWidth, clientHeight);

            if (timer > LimiterTicker) {
                createFirework();
                LimiterTicker = timer + TimedFirework / frameRate;
            }

            fireworks = fireworks.filter((fw) => !fw.del);
            fireworks.forEach((fw) => {
                fw.update(frameDelay);
                fw.draw();
            });

            particles = particles.filter((p) => p.opacity > 0);
            particles.forEach((p) => {
                p.update(frameDelay);
                p.draw();
            });

            timer++;
            requestAnimationFrame(update);
        };

        update();

        return () => {
            cancelAnimationFrame(update);
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
                zIndex: -1,
            }}
        />
    );
};

export default Fireworks;