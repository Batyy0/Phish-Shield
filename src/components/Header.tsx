import { Shield, BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="h-8 w-8 text-primary group-hover:animate-pulse-glow transition-all duration-300" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-cyber-blue bg-clip-text text-transparent">
                PhishShield
              </h1>
              <p className="text-xs text-muted-foreground">Cybersecurity Education Tool</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-2">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="cyber-glow"
            >
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Scanner
              </Link>
            </Button>
            
            <Button
              variant={isActive('/educate') ? 'default' : 'ghost'}
              size="sm"
              asChild
              className="cyber-glow"
            >
              <Link to="/educate">
                <BookOpen className="h-4 w-4 mr-2" />
                Education
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;