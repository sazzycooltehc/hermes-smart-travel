import { Navigation, Sparkles, Leaf, Clock, Wallet } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="text-center mb-12 pt-24">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
        <Sparkles className="w-4 h-4" />
        AI-Powered Smart Navigation
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 animate-slide-up">
        Travel Smarter with{" "}
        <span className="text-gradient">Hermes</span>
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: "100ms" }}>
        Compare routes across all transport modes. Get personalized recommendations based on time, cost, comfort, and environmental impact.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-lg bg-transport-train/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-transport-train" />
          </div>
          <span>Real-time data</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-accent" />
          </div>
          <span>Fare comparison</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-lg bg-transport-bus/10 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-transport-bus" />
          </div>
          <span>Eco-friendly options</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
