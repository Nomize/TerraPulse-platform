import { useEffect, useState } from "react";
import { Confetti } from "./Confetti";

interface PointsAnimationProps {
  value: number;
  show: boolean;
  onComplete: () => void;
  x?: number;
  y?: number;
}

export const PointsAnimation = ({ value, show, onComplete, x = 50, y = 50 }: PointsAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setShowConfetti(false);
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <>
      <Confetti active={showConfetti} duration={2000} />
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="animate-points-float">
          <span className="text-7xl font-black text-[#00FF41] drop-shadow-[0_0_30px_rgba(0,255,65,1)] animate-points-pulse">
            +{value}
          </span>
        </div>
      </div>
    </>
  );
};