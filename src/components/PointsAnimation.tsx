import { useEffect, useState } from "react";

interface PointsAnimationProps {
  value: number;
  show: boolean;
  onComplete: () => void;
}

export const PointsAnimation = ({ value, show, onComplete }: PointsAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="animate-[float_2s_ease-out]">
        <span className="text-6xl font-bold text-[#00FF41] drop-shadow-[0_0_30px_rgba(0,255,65,1)] animate-pulse">
          +{value}
        </span>
      </div>
    </div>
  );
};