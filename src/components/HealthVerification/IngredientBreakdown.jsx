import React, { useState } from "react";
import {
  MdExpandMore,
  MdExpandLess,
  MdInfo,
  MdScience,
  MdLink,
} from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Ingredient Breakdown Component
 * Shows detailed information about each ingredient with health benefits and scientific sources
 */
const IngredientBreakdown = ({ ingredients = [] }) => {
  const [expandedIngredient, setExpandedIngredient] = useState(null);

  if (!ingredients || ingredients.length === 0) {
    return null;
  }

  const toggleIngredient = (id) => {
    setExpandedIngredient(expandedIngredient === id ? null : id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MdScience className="text-primary" />
          Ingredient Breakdown
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Every ingredient explained with health benefits and scientific proof
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {ingredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
          >
            {/* Ingredient Header */}
            <button
              onClick={() => toggleIngredient(ingredient.id)}
              className="w-full p-4 text-left hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{ingredient.name}</h4>
                    {ingredient.organic && (
                      <Badge variant="secondary" className="text-xs">
                        Organic
                      </Badge>
                    )}
                    {ingredient.verified && (
                      <Badge variant="default" className="text-xs bg-green-500">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {ingredient.purpose}
                  </p>
                </div>
                {expandedIngredient === ingredient.id ? (
                  <MdExpandLess className="text-2xl text-muted-foreground flex-shrink-0" />
                ) : (
                  <MdExpandMore className="text-2xl text-muted-foreground flex-shrink-0" />
                )}
              </div>
            </button>

            {/* Expanded Details */}
            {expandedIngredient === ingredient.id && (
              <div className="px-4 pb-4 pt-0 space-y-4 bg-muted/30">
                {/* Health Benefits */}
                {ingredient.healthBenefits && ingredient.healthBenefits.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <MdInfo className="text-primary" />
                      Health Benefits
                    </h5>
                    <ul className="space-y-1">
                      {ingredient.healthBenefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nutritional Info */}
                {ingredient.nutritionalValue && (
                  <div>
                    <h5 className="text-sm font-semibold mb-2">Nutritional Value</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(ingredient.nutritionalValue).map(([key, value]) => (
                        <div
                          key={key}
                          className="bg-background rounded p-2 text-xs"
                        >
                          <p className="text-muted-foreground capitalize">{key}</p>
                          <p className="font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scientific Sources */}
                {ingredient.sources && ingredient.sources.length > 0 && (
                  <div>
                    <h5 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <MdLink className="text-primary" />
                      Scientific Sources
                    </h5>
                    <div className="space-y-2">
                      {ingredient.sources.map((source, index) => (
                        <a
                          key={index}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-2 bg-background rounded hover:bg-accent transition-colors"
                        >
                          <p className="text-xs font-medium text-primary hover:underline">
                            {source.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {source.publication} • {source.year}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Warnings/Notes */}
                {ingredient.warnings && ingredient.warnings.length > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded p-3">
                    <h5 className="text-sm font-semibold text-orange-900 mb-1">
                      Important Notes
                    </h5>
                    <ul className="space-y-1">
                      {ingredient.warnings.map((warning, index) => (
                        <li
                          key={index}
                          className="text-xs text-orange-800 flex items-start gap-2"
                        >
                          <span className="mt-0.5">⚠️</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Disclaimer */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> All health claims are backed by scientific research
            and verified by certified nutritionists. Sources are provided for
            transparency.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IngredientBreakdown;
