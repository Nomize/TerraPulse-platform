import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface BadgeUnlockModalProps {
  open: boolean;
  onClose: () => void;
  badge: {
    icon: LucideIcon;
    name: string;
    description: string;
    emoji?: string;
  };
}

export const BadgeUnlockModal = ({ open, onClose, badge }: BadgeUnlockModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-primary max-w-md">
        <div className="text-center space-y-6 py-8">
          {/* Animated badge icon */}
          <motion.div 
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <motion.div 
              className="relative bg-gradient-to-br from-primary/30 to-accent/20 rounded-full p-8 inline-block"
              animate={{ 
                boxShadow: [
                  "0 0 20px hsl(142 35% 40% / 0.3)",
                  "0 0 40px hsl(142 35% 40% / 0.5)",
                  "0 0 20px hsl(142 35% 40% / 0.3)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <badge.icon className="h-24 w-24 text-primary" />
              {badge.emoji && (
                <motion.span 
                  className="absolute -top-2 -right-2 text-4xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  {badge.emoji}
                </motion.span>
              )}
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-primary">
              🎉 Badge Unlocked!
            </h2>
            <h3 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-2">
              {badge.emoji && <span>{badge.emoji}</span>}
              {badge.name}
            </h3>
            <p className="text-muted-foreground">{badge.description}</p>
          </motion.div>

          <motion.div 
            className="flex gap-3 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              onClick={onClose}
            >
              Awesome!
            </Button>
            <Button 
              variant="outline"
              onClick={onClose}
            >
              Share
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
