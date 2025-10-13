import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const GuestBanner = () => {
  const isGuest = localStorage.getItem('terrapulse_guest_mode') === 'true';
  
  if (!isGuest) return null;

  return (
    <Alert className="mb-4 bg-status-moderate/10 border-status-moderate">
      <AlertCircle className="h-4 w-4 text-status-moderate" />
      <AlertDescription className="flex items-center justify-between">
        <span>You're in Guest Mode - Sign up to save your progress</span>
        <Link to="/signup">
          <Button size="sm" className="ml-4 bg-primary text-black hover:bg-primary/90">
            Create Account
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
};
