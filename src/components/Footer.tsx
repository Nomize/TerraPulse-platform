import { Link } from "react-router-dom";
import { Leaf, Mail, Github, Linkedin, Twitter, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-background relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
      
      <div className="container relative py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Leaf className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all"></div>
              </div>
              <span className="text-xl font-heading font-bold text-glow">TerraPulse</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-Powered Land Regeneration Platform
            </p>
            <p className="text-xs text-primary font-mono">
              Built for LandReGen Hackathon
            </p>
            <p className="text-xs text-muted-foreground">
              Powered by Satellite Data, AI & Climate Passion
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 text-primary">Platform</h3>
            <ul className="space-y-2">
              {["Dashboard", "AI Assistant", "Impact Tracker", "Data Insights"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 text-primary">Resources</h3>
            <ul className="space-y-2">
              {["About", "How It Works", "Data Sources", "API Docs", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 transition-transform"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-sm mb-4 text-primary">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get the latest insights on land regeneration
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="h-9 bg-background border-primary/20 focus:border-primary"
              />
              <Button size="sm" className="shadow-glow hover:shadow-glow-lg transition-all">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-primary/20 gap-4">
          <div className="flex items-center space-x-4">
            {[
              { icon: Mail, label: "Email" },
              { icon: Github, label: "GitHub" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
            ].map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </Button>
            ))}
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-sm text-muted-foreground">
              © 2025 TerraPulse. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-end gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="h-3 w-3 text-success fill-success animate-pulse" /> for the Planet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
