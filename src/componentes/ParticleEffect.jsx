import { useEffect, useRef } from 'react';

export default function ParticleEffect({ isActive }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; // Altura completa para que salgan del navbar

    class Particle {
      constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        
        // Movimiento radial desde el centro
        this.angle = angle;
        this.speed = speed;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        
        this.friction = 0.98; // Fricción para desacelerar
        this.gravity = 0.15;
        this.opacity = 1;
        this.decay = Math.random() * 0.012 + 0.008;
        
        // Colores más vibrantes tipo explosión
        const rand = Math.random();
        if (rand < 0.25) {
          this.color = '#FF6B00'; // Naranja intenso
        } else if (rand < 0.5) {
          this.color = '#FFD700'; // Dorado
        } else if (rand < 0.75) {
          this.color = '#FF4500'; // Rojo naranja
        } else {
          this.color = '#FFA500'; // Naranja
        }
      }

      update() {
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        this.speedY += this.gravity;
        
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.decay;
        this.size *= 0.98;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const createParticles = () => {
      const particleCount = 100;
      const centerX = canvas.width / 2;
      const centerY = 50; // Centro del navbar
      
      // Crear explosión radial desde el centro
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 8 + 4;
        particlesRef.current.push(new Particle(centerX, centerY, angle, speed));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.update();
        particle.draw();
        return particle.opacity > 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isActive) {
      createParticles();
      // Segunda explosión más pequeña para efecto de doble impacto
      const interval1 = setTimeout(() => {
        const centerX = canvas.width / 2;
        const centerY = 50;
        for (let i = 0; i < 50; i++) {
          const angle = (Math.PI * 2 * i) / 50 + (Math.random() - 0.5) * 0.5;
          const speed = Math.random() * 6 + 2;
          particlesRef.current.push(new Particle(centerX, centerY, angle, speed));
        }
      }, 150);
      
      animate();

      return () => {
        clearTimeout(interval1);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } else {
      particlesRef.current = [];
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 51 }}
    />
  );
}
