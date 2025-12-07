import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchPanel from "@/components/SearchPanel";
import RouteResults from "@/components/RouteResults";
import { RouteOption } from "@/components/RouteCard";

// Average speeds in km/h for Indian transport modes (based on real-world data)
const TRANSPORT_SPEEDS: Record<string, number> = {
  bus: 35,             // City/intercity bus with stops: 30-40 km/h
  train: 55,           // Local/Express train: 50-60 km/h
  bike: 45,            // Motorcycle in mixed traffic: 40-50 km/h
  auto: 28,            // Auto rickshaw in city: 25-30 km/h
  car: 60,             // Car on highways/city: 55-65 km/h
  "luxury-train": 110, // Vande Bharat/Shatabdi: 100-130 km/h
  flight: 750,         // Commercial flight cruise speed: 700-800 km/h
};

// Calculate distance using: distance = speed × time
const calculateDistance = (mode: string, durationMinutes: number): string => {
  const speed = TRANSPORT_SPEEDS[mode] || 50;
  const distanceKm = (speed * durationMinutes) / 60;
  return `${Math.round(distanceKm)} km`;
};

// Format duration from minutes to readable string
const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
};

const generateMockRoutes = (origin: string, destination: string): RouteOption[] => {
  // Route data with duration in minutes - distance calculated using speed × time formula
  // Fare order: Bus < Train < Bike < Auto < Car < Luxury Train < Flight
  // Time order: Flight < Luxury Train < Train < Car < Bike < Auto < Bus
  
  const routesData = [
    // Bus - Slowest, cheapest
    { id: "1", mode: "bus", durationMinutes: 150, fare: "₹45", co2: "1.5 kg", comfort: 2 },
    { id: "2", mode: "bus", durationMinutes: 135, fare: "₹80", co2: "1.3 kg", comfort: 3 },
    { id: "3", mode: "bus", durationMinutes: 180, fare: "₹55", co2: "1.8 kg", comfort: 2 },
    
    // Auto rickshaw - City travel, slow but flexible
    { id: "4", mode: "auto", durationMinutes: 85, fare: "₹150", co2: "2.5 kg", comfort: 2 },
    { id: "5", mode: "auto", durationMinutes: 75, fare: "₹180", co2: "2.3 kg", comfort: 3 },
    { id: "6", mode: "auto", durationMinutes: 95, fare: "₹130", co2: "2.8 kg", comfort: 2 },
    
    // Bike/Motorcycle - Moderate speed
    { id: "7", mode: "bike", durationMinutes: 70, fare: "₹200", co2: "2.0 kg", comfort: 3 },
    { id: "8", mode: "bike", durationMinutes: 60, fare: "₹250", co2: "1.8 kg", comfort: 3 },
    { id: "9", mode: "bike", durationMinutes: 80, fare: "₹180", co2: "2.2 kg", comfort: 2 },
    
    // Train - Fast, economical
    { id: "10", mode: "train", durationMinutes: 55, fare: "₹120", co2: "0.8 kg", comfort: 4, recommended: true },
    { id: "11", mode: "train", durationMinutes: 65, fare: "₹180", co2: "0.9 kg", comfort: 4 },
    { id: "12", mode: "train", durationMinutes: 48, fare: "₹220", co2: "0.7 kg", comfort: 4 },
    
    // Car - Comfortable, faster
    { id: "13", mode: "car", durationMinutes: 50, fare: "₹550", co2: "5.2 kg", comfort: 4 },
    { id: "14", mode: "car", durationMinutes: 42, fare: "₹720", co2: "4.5 kg", comfort: 5 },
    { id: "15", mode: "car", durationMinutes: 55, fare: "₹480", co2: "5.5 kg", comfort: 4 },
    
    // Luxury Train - Vande Bharat/Shatabdi, premium fast
    { id: "16", mode: "luxury-train", durationMinutes: 35, fare: "₹1,200", co2: "0.6 kg", comfort: 5 },
    { id: "17", mode: "luxury-train", durationMinutes: 28, fare: "₹1,800", co2: "0.5 kg", comfort: 5 },
    { id: "18", mode: "luxury-train", durationMinutes: 40, fare: "₹980", co2: "0.7 kg", comfort: 5 },
    
    // Flight - Fastest, long distance
    { id: "19", mode: "flight", durationMinutes: 65, fare: "₹3,500", co2: "45 kg", comfort: 4 },
    { id: "20", mode: "flight", durationMinutes: 85, fare: "₹4,800", co2: "52 kg", comfort: 5 },
    { id: "21", mode: "flight", durationMinutes: 55, fare: "₹2,800", co2: "38 kg", comfort: 4 },
  ];

  return routesData.map((route) => ({
    ...route,
    mode: route.mode as RouteOption["mode"],
    duration: formatDuration(route.durationMinutes),
    distance: calculateDistance(route.mode, route.durationMinutes),
  }));
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
