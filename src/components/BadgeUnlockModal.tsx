import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#0F1419] border-[#00FF41] max-w-md">
        <div className="text-center space-y-6 py-8">
          {/* Confetti effect placeholder */}
          <div className="relative">
            <div className="absolute inset-0 bg-[#00FF41]/20 rounded-full animate-ping" />
            <div className="relative bg-gradient-to-br from-[#00FF41]/30 to-[#00FF41]/10 rounded-full p-8 inline-block">
              <badge.icon className="h-24 w-24 text-[#00FF41] animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-[#00FF41] animate-bounce">
              Badge Unlocked!
            </h2>
            <h3 className="text-2xl font-semibold text-white">{badge.name}</h3>
            <p className="text-muted-foreground">{badge.description}</p>
          </div>

          <div className="flex gap-3 justify-center">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};