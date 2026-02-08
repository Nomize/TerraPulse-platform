import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              y: [50, 0, -50, -100], 
              scale: [0.5, 1.2, 1.1, 1]
            }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 2, times: [0, 0.2, 0.5, 1] }}
          >
            <motion.span 
              className="text-6xl font-bold text-primary"
              animate={{
                textShadow: [
                  "0 0 20px hsl(142 35% 40% / 0.4)",
                  "0 0 40px hsl(142 35% 40% / 0.7)",
                  "0 0 30px hsl(142 35% 40% / 0.5)",
                  "0 0 20px hsl(142 35% 40% / 0.4)"
                ]
              }}
              transition={{ duration: 1, repeat: 1 }}
            >
              +{value} pts
            </motion.span>
          </motion.div>
          
          {/* Particle effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-accent rounded-full"
              initial={{ 
                opacity: 0, 
                x: 0, 
                y: 0,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 1, 0], 
                x: Math.cos((i / 8) * Math.PI * 2) * 100,
                y: Math.sin((i / 8) * Math.PI * 2) * 100,
                scale: [0, 1.5, 0]
              }}
              transition={{ 
                duration: 1.5, 
                delay: 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};
