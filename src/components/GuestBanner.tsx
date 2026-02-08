import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const GuestBanner = () => {
  const isGuest = localStorage.getItem('terrapulse_guest_mode') === 'true';
  
  if (!isGuest) return null;

  return (
    <Alert className="mb-4 bg-accent/10 border-accent">
      <AlertCircle className="h-4 w-4 text-accent" />
      <AlertDescription className="flex items-center justify-between text-foreground">
        <span>You're in Guest Mode - Sign up to save your progress</span>
        <Link to="/signup">
          <Button size="sm" className="ml-4">
            Create Account
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
};
