import RouteCard, { RouteOption } from "./RouteCard";
import { ArrowUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RouteResultsProps {
  routes: RouteOption[];
  origin: string;
  destination: string;
}

type SortBy = "duration" | "fare" | "eco";

const RouteResults = ({ routes, origin, destination }: RouteResultsProps) => {
  const [sortBy, setSortBy] = useState<SortBy>("duration");

  const sortedRoutes = [...routes].sort((a, b) => {
    switch (sortBy) {
      case "duration":
        return a.durationMinutes - b.durationMinutes;
      case "fare":
        return parseFloat(a.fare.replace(/[^0-9.]/g, "")) - parseFloat(b.fare.replace(/[^0-9.]/g, ""));
      case "eco":
        return parseFloat(a.co2.replace(/[^0-9.]/g, "")) - parseFloat(b.co2.replace(/[^0-9.]/g, ""));
      default:
        return 0;
    }
  });

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            {origin} → {destination}
          </h2>
          <p className="text-sm text-muted-foreground">
            {routes.length} routes found • Sorted by {sortBy}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={sortBy === "duration" ? "default" : "secondary"}
            size="sm"
            onClick={() => setSortBy("duration")}
          >
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Fastest
          </Button>
          <Button
            variant={sortBy === "fare" ? "default" : "secondary"}
            size="sm"
            onClick={() => setSortBy("fare")}
          >
            Cheapest
          </Button>
          <Button
            variant={sortBy === "eco" ? "default" : "secondary"}
            size="sm"
            onClick={() => setSortBy("eco")}
          >
            Greenest
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedRoutes.map((route, index) => (
          <RouteCard key={route.id} route={route} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RouteResults;
