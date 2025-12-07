import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchPanel from "@/components/SearchPanel";
import RouteResults from "@/components/RouteResults";
import { RouteOption } from "@/components/RouteCard";

const generateMockRoutes = (origin: string, destination: string): RouteOption[] => {
  // Simulated route data for Indian cities - prices in INR
  // Distance varies by mode, Time: Flight < Train < Car < Bike < Bus
  return [
    // Bus - Slowest, cheapest, longer routes due to stops
    {
      id: "1",
      mode: "bus",
      duration: "2h 30min",
      durationMinutes: 150,
      distance: "52 km",
      fare: "₹45",
      co2: "1.5 kg",
      comfort: 2,
    },
    {
      id: "2",
      mode: "bus",
      duration: "2h 15min",
      durationMinutes: 135,
      distance: "48 km",
      fare: "₹80",
      co2: "1.3 kg",
      comfort: 3,
    },
    // Train - Fast, economical
    {
      id: "3",
      mode: "train",
      duration: "55 min",
      durationMinutes: 55,
      distance: "45 km",
      fare: "₹120",
      co2: "0.8 kg",
      comfort: 4,
      recommended: true,
    },
    {
      id: "4",
      mode: "train",
      duration: "1h 05min",
      durationMinutes: 65,
      distance: "50 km",
      fare: "₹180",
      co2: "0.9 kg",
      comfort: 4,
    },
    // Bike - Moderate speed, flexible routes
    {
      id: "5",
      mode: "bike",
      duration: "1h 45min",
      durationMinutes: 105,
      distance: "42 km",
      fare: "₹200",
      co2: "2.0 kg",
      comfort: 3,
    },
    {
      id: "6",
      mode: "bike",
      duration: "1h 30min",
      durationMinutes: 90,
      distance: "38 km",
      fare: "₹250",
      co2: "1.8 kg",
      comfort: 3,
    },
    // Auto - City travel, shorter distances
    {
      id: "7",
      mode: "auto",
      duration: "1h 25min",
      durationMinutes: 85,
      distance: "28 km",
      fare: "₹350",
      co2: "2.5 kg",
      comfort: 2,
    },
    {
      id: "8",
      mode: "auto",
      duration: "1h 15min",
      durationMinutes: 75,
      distance: "25 km",
      fare: "₹420",
      co2: "2.3 kg",
      comfort: 3,
    },
    // Car - Faster than bike/bus, direct routes
    {
      id: "9",
      mode: "car",
      duration: "1h 10min",
      durationMinutes: 70,
      distance: "48 km",
      fare: "₹550",
      co2: "5.2 kg",
      comfort: 4,
    },
    {
      id: "10",
      mode: "car",
      duration: "1h 00min",
      durationMinutes: 60,
      distance: "52 km",
      fare: "₹750",
      co2: "5.5 kg",
      comfort: 5,
    },
    // Luxury Train - Premium, faster than regular train
    {
      id: "11",
      mode: "luxury-train",
      duration: "50 min",
      durationMinutes: 50,
      distance: "55 km",
      fare: "₹1,200",
      co2: "0.6 kg",
      comfort: 5,
    },
    {
      id: "12",
      mode: "luxury-train",
      duration: "45 min",
      durationMinutes: 45,
      distance: "58 km",
      fare: "₹1,800",
      co2: "0.5 kg",
      comfort: 5,
    },
    // Flight - Fastest, long distance
    {
      id: "13",
      mode: "flight",
      duration: "35 min",
      durationMinutes: 35,
      distance: "320 km",
      fare: "₹3,500",
      co2: "45 kg",
      comfort: 4,
    },
    {
      id: "14",
      mode: "flight",
      duration: "40 min",
      durationMinutes: 40,
      distance: "450 km",
      fare: "₹4,800",
      co2: "52 kg",
      comfort: 5,
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
