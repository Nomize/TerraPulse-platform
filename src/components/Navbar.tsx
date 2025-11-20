import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf, Bell, User, Search, Settings, LayoutDashboard, HelpCircle, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "AI Assistant", path: "/ai-insights" },
    { name: "Impact Tracker", path: "/impact-tracker" },
    { name: "Data Insights", path: "/data-insights" },
    { name: "Achievements", path: "/achievements" },
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-primary/10 hover:scale-110 transition-transform"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="h-5 w-5 text-primary" />
            <span className="absolute top-0 right-0 min-w-[18px] h-[18px] bg-primary text-black text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,255,65,0.8)]">
              3
            </span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-primary/10 hover:scale-110 transition-transform"
              >
                <div className="relative">
                  <User className="h-5 w-5 text-primary" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-background rounded-full"></div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 bg-[#0F1419] border-primary/30 shadow-[0_0_20px_rgba(0,255,65,0.3)]"
              align="end"
            >
              <DropdownMenuItem 
                className="hover:bg-[#1A1F26] focus:bg-[#1A1F26] cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                <User className="mr-2 h-4 w-4 text-primary" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#1A1F26] focus:bg-[#1A1F26] cursor-pointer"
                onClick={() => navigate('/settings')}
              >
                <Settings className="mr-2 h-4 w-4 text-primary" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#1A1F26] focus:bg-[#1A1F26] cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard className="mr-2 h-4 w-4 text-primary" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#1A1F26] focus:bg-[#1A1F26] cursor-pointer"
              >
                <HelpCircle className="mr-2 h-4 w-4 text-primary" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-primary/20" />
              <DropdownMenuItem 
                className="hover:bg-[#1A1F26] focus:bg-[#1A1F26] cursor-pointer text-red-500"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
