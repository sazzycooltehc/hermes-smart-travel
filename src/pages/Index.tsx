import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchPanel from "@/components/SearchPanel";
import RouteResults from "@/components/RouteResults";
import { RouteOption } from "@/components/RouteCard";

/* -----------------------------------------
   SPEED VALUES (km/h)
------------------------------------------ */
const TRANSPORT_SPEEDS: Record<string, number> = {
  bus: 35,
  auto: 28,
  bike: 45,
  train: 55,
  car: 60,
  "luxury-train": 110,
  flight: 750,
};

/* -----------------------------------------
   MOCK DISTANCE HELPER (NO API KEY)
------------------------------------------ */

const getDistance = async (origin: string, destination: string) => {
  // If same place → give small distance
  if (origin.toLowerCase() === destination.toLowerCase()) return 5;

  // generate pseudo distance 50–800 km based on string characteristics
  const base =
    Math.abs(origin.length * 7 - destination.length * 5) +
    Math.abs(origin.charCodeAt(0) - destination.charCodeAt(0));

  const distanceKm = Math.max(50, Math.min(800, base)); // ensure realistic range

  return distanceKm;
};

/* -----------------------------------------
   FARE PER KM
------------------------------------------ */
const FARE_PER_KM: Record<string, number> = {
  bus: 0.6,
  auto: 2,
  bike: 1.5,
  train: 1.2,
  car: 6.5,
  "luxury-train": 10,
  flight: 15,
};

/* -----------------------------------------
   CO2 EMISSION (kg per km)
------------------------------------------ */
const CO2_PER_KM: Record<string, number> = {
  bus: 0.012,
  auto: 0.025,
  bike: 0.02,
  train: 0.008,
  car: 0.045,
  "luxury-train": 0.007,
  flight: 0.3,
};

/* -----------------------------------------
   COMFORT LEVELS
------------------------------------------ */
const COMFORT: Record<string, number> = {
  bus: 2,
  auto: 2,
  bike: 2,
  train: 4,
  car: 4,
  "luxury-train": 5,
  flight: 4,
};

/* -----------------------------------------
   DURATION = distance / speed
------------------------------------------ */
const calculateDuration = (distanceKm: number, mode: string): number => {
  const speed = TRANSPORT_SPEEDS[mode] || 50;
  return Math.round((distanceKm / speed) * 60); // in minutes
};

/* -----------------------------------------
   FARE = distance * perKmRate
------------------------------------------ */
const calculateFare = (mode: string, distanceKm: number): string => {
  const rate = FARE_PER_KM[mode] || 2;
  return `₹${Math.round(distanceKm * rate)}`;
};

/* -----------------------------------------
   CO2 = distance * perKm
------------------------------------------ */
const calculateCO2 = (mode: string, distanceKm: number): string => {
  const rate = CO2_PER_KM[mode] || 0.02;
  return `${(distanceKm * rate).toFixed(1)} kg`;
};

/* -----------------------------------------
   FORMAT DURATION
------------------------------------------ */
const formatDuration = (mins: number): string => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m} min`;
};

/* -----------------------------------------
   GENERATE ROUTES (Uses dynamic distance)
------------------------------------------ */
const generateMockRoutes = (
  distanceKm: number
): RouteOption[] => {
  const modes = [
    "bus",
    "auto",
    "bike",
    "train",
    "car",
    "luxury-train",
    "flight",
  ];

  return modes.map((mode, index) => {
    const durationMin = calculateDuration(distanceKm, mode);

    return {
      id: `${index + 1}`,
      mode: mode as RouteOption["mode"],
      durationMinutes: durationMin,
      duration: formatDuration(durationMin),
      distance: `${distanceKm} km`,
      fare: calculateFare(mode, distanceKm),
      co2: calculateCO2(mode, distanceKm),
      comfort: COMFORT[mode],
      recommended: mode === "train",
    };
  });
};

/* -----------------------------------------
   MAIN COMPONENT
------------------------------------------ */
const Index = () => {
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [searchData, setSearchData] = useState<{
    origin: string;
    destination: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (origin: string, destination: string) => {
    setIsLoading(true);

    // Get mock dynamic distance instead of fixed km
    const distanceKm = await getDistance(origin, destination);

    const mockRoutes = generateMockRoutes(distanceKm);
    setRoutes(mockRoutes);

    setSearchData({ origin, destination });

    setIsLoading(false);
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

      {/* background visuals */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </div>
  );
};

export default Index;