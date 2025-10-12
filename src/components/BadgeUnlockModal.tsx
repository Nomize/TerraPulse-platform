import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Confetti } from "./Confetti";

interface BadgeUnlockModalProps {
  open: boolean;
  onClose: () => void;
  badge: {
    icon: LucideIcon;
    name: string;
    description: string;
  };
}

export const BadgeUnlockModal = ({ open, onClose, badge }: BadgeUnlockModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      <Confetti active={showConfetti} duration={3000} />
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-[#0F1419] border-[#00FF41] border-2 max-w-md shadow-[0_0_80px_rgba(0,255,65,0.5)]">
          <div className="text-center space-y-6 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 via-transparent to-[#10B981]/5 animate-pulse" />

            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF41]/20 rounded-full animate-ping-slow" />
              <div className="absolute inset-0 bg-[#00FF41]/10 rounded-full animate-pulse-glow" />
              <div className="relative bg-gradient-to-br from-[#00FF41]/30 to-[#10B981]/20 rounded-full p-10 inline-block animate-scale-in border-4 border-[#00FF41]/50">
                <badge.icon className="h-28 w-28 text-[#00FF41] animate-badge-spin drop-shadow-[0_0_30px_rgba(0,255,65,0.8)]" />
              </div>
            </div>

            <div className="space-y-3 relative">
              <h2 className="text-4xl font-black text-[#00FF41] animate-badge-title drop-shadow-[0_0_20px_rgba(0,255,65,0.8)]">
                Badge Unlocked!
              </h2>
              <h3 className="text-2xl font-bold text-white animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                {badge.name}
              </h3>
              <p className="text-muted-foreground text-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                {badge.description}
              </p>
            </div>

            <div className="flex gap-3 justify-center relative animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <Button
                onClick={onClose}
                className="bg-[#00FF41] text-black hover:bg-[#39FF14] font-bold text-lg px-8 py-6 shadow-[0_0_20px_rgba(0,255,65,0.5)] hover:shadow-[0_0_30px_rgba(0,255,65,0.8)] transition-all transform hover:scale-110"
              >
                Awesome!
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="border-2 border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/10 font-bold text-lg px-6 py-6 transition-all transform hover:scale-105"
              >
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};