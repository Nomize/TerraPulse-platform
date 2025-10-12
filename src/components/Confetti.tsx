import { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

export const Confetti = ({ active, duration = 3000 }: ConfettiProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (active) {
      setIsActive(true);
      const colors = ["#00FF41", "#10B981", "#39FF14", "#00E676"];
      const particleCount = 50;

      const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 20,
        y: 50,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        velocityX: (Math.random() - 0.5) * 8,
        velocityY: -Math.random() * 15 - 5,
        rotationSpeed: (Math.random() - 0.5) * 10,
      }));

      setParticles(newParticles);

      const timer = setTimeout(() => {
        setIsActive(false);
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animation: `confetti-fall ${duration}ms ease-out forwards`,
            animationDelay: `${Math.random() * 200}ms`,
            '--velocity-x': `${particle.velocityX}vw`,
            '--velocity-y': `${particle.velocityY}vh`,
            '--rotation-speed': `${particle.rotationSpeed * 360}deg`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
