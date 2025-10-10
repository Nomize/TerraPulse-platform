import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, Bell, User, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "AI Assistant", path: "/ai-insights" },
    { name: "Impact Tracker", path: "/impact-tracker" },
    { name: "Data Insights", path: "/data-insights" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo with Pulsing Animation */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative w-10 h-10">
            <Leaf className="absolute inset-0 w-10 h-10 text-primary animate-pulse" />
            <Leaf className="absolute inset-0 w-10 h-10 text-primary opacity-50 animate-ping" />
          </div>
          <span className="text-xl font-heading font-bold text-white">TerraPulse</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isActive(item.path)
                  ? "bg-primary/10 text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
            <Search className="h-5 w-5 text-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
            <Bell className="h-5 w-5 text-primary" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse shadow-glow"></span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <div className="relative">
              <User className="h-5 w-5 text-primary" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-background rounded-full"></div>
            </div>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-card border-primary/20">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-md text-base font-medium transition-all ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary border-l-4 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-primary/20 space-y-2">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Bell className="mr-2 h-5 w-5" /> Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <User className="mr-2 h-5 w-5" /> Profile
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
