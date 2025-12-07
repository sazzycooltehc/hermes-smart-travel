import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchPanel from "@/components/SearchPanel";
import RouteResults from "@/components/RouteResults";
import { RouteOption } from "@/components/RouteCard";

const generateMockRoutes = (origin: string, destination: string): RouteOption[] => {
  // Simulated route data - in production, this would come from an API
  return [
    {
      id: "1",
      mode: "train",
      duration: "45 min",
      durationMinutes: 45,
      distance: "28 km",
      fare: "$8.50",
      co2: "0.8 kg",
      comfort: 5,
      recommended: true,
    },
    {
      id: "2",
      mode: "car",
      duration: "35 min",
      durationMinutes: 35,
      distance: "32 km",
      fare: "$12.00",
      co2: "5.2 kg",
      comfort: 4,
    },
    {
      id: "3",
      mode: "bus",
      duration: "55 min",
      durationMinutes: 55,
      distance: "30 km",
      fare: "$4.00",
      co2: "1.2 kg",
      comfort: 3,
    },
    {
      id: "4",
      mode: "bike",
      duration: "1h 20min",
      durationMinutes: 80,
      distance: "26 km",
      fare: "Free",
      co2: "0 kg",
      comfort: 3,
    },
    {
      id: "5",
      mode: "walk",
      duration: "5h 30min",
      durationMinutes: 330,
      distance: "24 km",
      fare: "Free",
      co2: "0 kg",
      comfort: 2,
    },
  ];
};

const Index = () => {
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [searchData, setSearchData] = useState<{ origin: string; destination: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (origin: string, destination: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockRoutes = generateMockRoutes(origin, destination);
      setRoutes(mockRoutes);
      setSearchData({ origin, destination });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        
        <SearchPanel onSearch={handleSearch} isLoading={isLoading} />
        
        {routes.length > 0 && searchData && (
          <div className="mt-12">
            <RouteResults
              routes={routes}
              origin={searchData.origin}
              destination={searchData.destination}
            />
          </div>
        )}
      </main>

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>
    </div>
  );
};

export default Index;
