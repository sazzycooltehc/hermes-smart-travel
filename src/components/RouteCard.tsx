import { Car, Train, Bus, Bike, Footprints, Plane, IndianRupee, Leaf, Heart, Route } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RouteOption {
  id: string;
  mode: "car" | "train" | "bus" | "bike" | "auto" | "flight" | "luxury-train";
  duration: string;
  durationMinutes: number;
  distance: string;
  fare: string;
  co2: string;
  comfort: number;
  recommended?: boolean;
}

const modeConfig = {
  car: {
    icon: Car,
    label: "Car",
    colorClass: "bg-transport-car",
    bgClass: "bg-transport-car/10",
  },
  train: {
    icon: Train,
    label: "Train",
    colorClass: "bg-transport-train",
    bgClass: "bg-transport-train/10",
  },
  bus: {
    icon: Bus,
    label: "Bus",
    colorClass: "bg-transport-bus",
    bgClass: "bg-transport-bus/10",
  },
  bike: {
    icon: Bike,
    label: "Bike",
    colorClass: "bg-transport-bike",
    bgClass: "bg-transport-bike/10",
  },
  auto: {
    icon: Car,
    label: "Auto Rickshaw",
    colorClass: "bg-amber-500",
    bgClass: "bg-amber-500/10",
  },
  flight: {
    icon: Plane,
    label: "Flight",
    colorClass: "bg-sky-500",
    bgClass: "bg-sky-500/10",
  },
  "luxury-train": {
    icon: Train,
    label: "Luxury Train",
    colorClass: "bg-purple-500",
    bgClass: "bg-purple-500/10",
  },
};

interface RouteCardProps {
  route: RouteOption;
  index: number;
}

const RouteCard = ({ route, index }: RouteCardProps) => {
  const config = modeConfig[route.mode];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative gradient-card rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer group animate-slide-up",
        route.recommended
          ? "border-primary shadow-glow"
          : "border-transparent shadow-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {route.recommended && (
        <div className="absolute -top-3 left-4 px-3 py-1 gradient-hero rounded-full text-xs font-semibold text-primary-foreground">
          Recommended
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center shrink-0", config.bgClass)}>
          <Icon className={cn("w-7 h-7", `text-transport-${route.mode}`)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">{config.label}</h3>
            <span className="text-2xl font-bold text-foreground">{route.duration}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{route.distance}</span>
            </div>

            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">{route.fare}</span>
            </div>

            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-transport-bus" />
              <span className="text-sm text-muted-foreground">{route.co2}</span>
            </div>

            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-destructive" />
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      star <= route.comfort ? "bg-accent" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
