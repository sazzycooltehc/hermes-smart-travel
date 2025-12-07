import { useState } from "react";
import { MapPin, Navigation2, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchPanelProps {
  onSearch: (origin: string, destination: string) => void;
  isLoading: boolean;
}

const SearchPanel = ({ onSearch, isLoading }: SearchPanelProps) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (origin && destination) {
      onSearch(origin, destination);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="gradient-glass rounded-2xl p-6 md:p-8 shadow-lg border border-border/30">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Plan Your Journey</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-transport-walk" />
            <Input
              placeholder="Where are you starting from?"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="pl-12"
            />
          </div>

          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
            </div>
          </div>

          <div className="relative">
            <Navigation2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input
              placeholder="Where do you want to go?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-12"
            />
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full mt-6"
            disabled={isLoading || !origin || !destination}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Finding Best Routes...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Find Smart Routes
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SearchPanel;
