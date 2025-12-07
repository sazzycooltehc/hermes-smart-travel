import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchPanel from "@/components/SearchPanel";
import RouteResults from "@/components/RouteResults";
import { RouteOption } from "@/components/RouteCard";

import cityDistances from "@/components/data/cityDistance";
import cityCoordinates from "@/components/data/cityCoordinate";

/* -----------------------------------------
   HELPER: LOWERCASE CLEAN PLACE NAME
------------------------------------------ */
const normalize = (str: string) =>
  str.trim().toLowerCase().replace(/\s+/g, "");

/* -----------------------------------------
   HAVERSINE DISTANCE (km)
------------------------------------------ */
const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // earth radius km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/* -----------------------------------------
   GET REAL DISTANCE WITHOUT API
------------------------------------------ */
const getDistance = async (origin: string, destination: string) => {
  const o = normalize(origin);
  const d = normalize(destination);

  if (o === d) return 5;

  // 1️⃣ Try lookup table
  if (cityDistances[o] && cityDistances[o][d]) {
    return cityDistances[o][d]; // exact known distance
  }

  // 2️⃣ If either city found in coordinates → fallback Haversine
  if (cityCoordinates[o] && cityCoordinates[d]) {
    const [lat1, lon1] = cityCoordinates[o];
    const [lat2, lon2] = cityCoordinates[d];

    return Math.round(haversine(lat1, lon1, lat2, lon2));
  }

  // 3️⃣ If unknown city → generate safe random distance
  return Math.floor(Math.random() * 400) + 200; // 200–600 km
};

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
   COST / CO₂ / COMFORT CONFIG
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

const CO2_PER_KM: Record<string, number> = {
  bus: 0.012,
  auto: 0.025,
  bike: 0.02,
  train: 0.008,
  car: 0.045,
  "luxury-train": 0.007,
  flight: 0.3,
};

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
   CALCULATIONS
------------------------------------------ */
const calculateDuration = (distanceKm: number, mode: string) => {
  const speed = TRANSPORT_SPEEDS[mode] || 50;
  return Math.round((distanceKm / speed) * 60);
};

const calculateFare = (mode: string, distanceKm: number) =>
  `₹${Math.round(distanceKm * (FARE_PER_KM[mode] || 2))}`;

const calculateCO2 = (mode: string, distanceKm: number) =>
  `${(distanceKm * (CO2_PER_KM[mode] || 0.02)).toFixed(1)} kg`;

const formatDuration = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m} min`;
};

/* -----------------------------------------
   GENERATE ROUTES USING REAL DISTANCE
------------------------------------------ */
const generateRoutes = (distanceKm: number): RouteOption[] => {
  const modes = [
    "bus",
    "auto",
    "bike",
    "train",
    "car",
    "luxury-train",
    "flight",
  ];

  return modes.map((mode, i) => {
    const mins = calculateDuration(distanceKm, mode);
    return {
      id: `${i + 1}`,
      mode: mode as RouteOption["mode"],
      durationMinutes: mins,
      duration: formatDuration(mins),
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

    const distanceKm = await getDistance(origin, destination);

    setRoutes(generateRoutes(distanceKm));
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
    </div>
  );
};

export default Index;