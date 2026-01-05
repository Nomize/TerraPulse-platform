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
      <DialogContent className="bg-[#0F1419] border-[#00FF41] max-w-md">
        <div className="text-center space-y-6 py-8">
          {/* Animated badge icon */}
          <motion.div 
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
          >
            <div className="absolute inset-0 bg-[#00FF41]/20 rounded-full animate-ping" />
            <motion.div 
              className="relative bg-gradient-to-br from-[#00FF41]/30 to-[#00FF41]/10 rounded-full p-8 inline-block"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(0,255,65,0.3)",
                  "0 0 60px rgba(0,255,65,0.6)",
                  "0 0 20px rgba(0,255,65,0.3)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <badge.icon className="h-24 w-24 text-[#00FF41]" />
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
            <h2 className="text-3xl font-bold text-[#00FF41]">
              🎉 Badge Unlocked!
            </h2>
            <h3 className="text-2xl font-semibold text-white flex items-center justify-center gap-2">
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
              className="bg-[#00FF41] text-black hover:bg-[#39FF14]"
            >
              Awesome!
            </Button>
            <Button 
              variant="outline"
              onClick={onClose}
              className="border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/10"
            >
              Share
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
