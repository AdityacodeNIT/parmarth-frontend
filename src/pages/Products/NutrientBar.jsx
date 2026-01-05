import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  CheckCircle2, 
  Circle, 
  Zap, 
  ShieldCheck, 
  Activity, 
  MoveRight,
  Heart,
  Brain
} from "lucide-react";

// Helper to get icons based on benefit string (optional)
const getBenefitIcon = (label) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("gut")) return <Activity className="w-5 h-5" />;
  if (lowerLabel.includes("energy")) return <Zap className="w-5 h-5" />;
  if (lowerLabel.includes("immun")) return <ShieldCheck className="w-5 h-5" />;
  if (lowerLabel.includes("heart")) return <Heart className="w-5 h-5" />;
  if (lowerLabel.includes("brain")) return <Brain className="w-5 h-5" />;
  return <CheckCircle2 className="w-5 h-5" />; // Fallback icon
};

export default function NutrientCard({ 
  productName = "Unknown Product",
  calories = 0,
  nutriScore = "A",
  healthGrade = "Excellent",
  // Default empty arrays to prevent crashes if data is missing
  macros = [], 
  micros = [], 
  benefits = [] 
}) {

  return (
    <div className="flex justify-center p-8 bg-background text-foreground min-h-[600px] items-center">
      <Card className="w-full max-w-4xl  rounded-3xl shadow-xl overflow-hidden p-8 border-none">
        
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <Leaf className="w-8 h-8 text-green-600 mb-2 " />
          <h1 className="text-3xl font-bold  tracking-tight uppercase">
            Nutrient Facts
          </h1>
          <p className=" mt-1">Product: {productName}</p>
        </div>

        {/* Main Grid Content */}
        <div className=" rounded-2xl border border-slate-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* COLUMN 1: MACROS */}
            <div className="space-y-6">
              <h3 className="text-center font-semibold  uppercase tracking-wide">
                Macros
              </h3>
              
              {/* Calories Hero */}
              <div>
                <div className="text-sm font-bold  uppercase">Calories:</div>
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold ">{calories}</span>
                  <div className="flex flex-col gap-1.5 w-full max-w-[100px]">
                    {/* Decorative bars for visual flair */}
                    <div className="h-2 w-full  rounded-full overflow-hidden">
                        <div className="h-full  w-3/4 rounded-full" />
                    </div>
                    <div className="h-2 w-full  rounded-full overflow-hidden">
                        <div className="h-full  w-1/2 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Macro Bars List */}
              <div className="space-y-3 pt-2">
                {macros.map((m, i) => {
                  // Calculate width percentage relative to a standard daily value (e.g. 50g)
                  // Or use a passed 'percentage' prop if available. 
                  // Fallback to 50% width if calculation fails.
                  const widthVal = m.percentage ? `${m.percentage}%` : '50%';
                  const colorClass = m.color || "bg-blue-500"; // Default color

                  return (
                    <div key={i} className="grid grid-cols-[80px_1fr] items-center gap-2">
                      <div className="flex justify-between text-sm font-bold ">
                        <span className="uppercase">{m.label}</span>
                        <span>{m.value}</span>
                      </div>
                      <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${colorClass}`} 
                          style={{ width: widthVal }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COLUMN 2: MICROS */}
            <div className="relative md:border-l md:border-r border-slate-200 md:px-6 space-y-4">
               {/* Mobile Divider */}
               <div className="md:hidden w-full h-px bg-slate-200 my-4"></div>
               
              <h3 className="text-center font-semibold  uppercase tracking-wide mb-6">
                Micros (%DV)
              </h3>
              <div className="space-y-3">
                {micros.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-sm font-medium ">
                    <span className="uppercase">{m.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{m.value}</span>
                      {m.active ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-100" />
                      ) : (
                        <Circle className="w-4 h-4 " />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 3: KEY BENEFITS */}
            <div className="space-y-6 md:pl-2">
               {/* Mobile Divider */}
               <div className="md:hidden w-full h-px bg-slate-200 my-4"></div>

              <h3 className="text-center font-semibold  uppercase tracking-wide">
                Key Benefits
              </h3>
              <div className="space-y-6 pt-4">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full text-green-700 border border-green-200">
                      {/* Check if 'icon' prop exists, otherwise try to generate one based on label */}
                      {b.icon ? b.icon : getBenefitIcon(b.label)}
                    </div>
                    <span className="font-bold text-sm  uppercase">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-600"></div>
                <span className="font-bold  uppercase">Nutri-Score:</span>
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-sm">
                  {nutriScore}
                </span>
            </div>
            
            <div className="font-bold  uppercase tracking-tight">
                Health Grade: <span className=" font-medium">{healthGrade}</span>
            </div>


        </div>

      </Card>
    </div>
  );
}