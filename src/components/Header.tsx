import { MapPin, Navigation } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 gradient-glass border-b border-border/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
            <Navigation className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Hermes</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Routes
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Saved
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Settings
          </a>
        </nav>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Smart Travel</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
