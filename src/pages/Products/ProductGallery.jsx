import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0);

  const safeImages =
    images.length > 0 ? images : ["/placeholder.png"];

  return (
    <div className="flex flex-col items-center gap-5 sm:gap-6">
      {/* Main Image */}
      <Card
        className="
          relative
          w-[240px]
          sm:w-[280px]
          md:w-xs
          lg:w-md
          aspect-square
          rounded-2xl
          flex
          items-center
          justify-center
          bg-white
          shadow-sm
          overflow-hidden
        "
      >
        {/* Subtle wellness glow */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-emerald-200/10
            via-transparent
            to-cyan-200/10
            pointer-events-none
          "
        />

        <img
          src={safeImages[active]}
          alt={name}
          className="
            relative
            max-w-[82%]
            max-h-[82%]
            object-contain
            transition-transform duration-300
            hover:scale-[1.02]
          "
        />
      </Card>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
          {safeImages.map((img, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="icon"
              aria-label={`View image ${idx + 1}`}
              onClick={() => setActive(idx)}
              className={`
                w-12 h-12
                sm:w-14 sm:h-14
                rounded-lg
                bg-white
                transition
                ${
                  active === idx
                    ? "border-emerald-500 ring-2 ring-emerald-500/30"
                    : "border-muted hover:border-foreground/30"
                }
              `}
            >
              <img
                src={img}
                alt={`${name} ${idx + 1}`}
                className="
                  max-w-[80%]
                  max-h-[80%]
                  object-contain
                "
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
