import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  return (
    <Card className="bg-card">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
        
        {/* Product image */}
        <Link to={`/product/${item._id}`} className="shrink-0">
          <img
            src={item.imgLink || item.ProductImage}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
        </Link>

        {/* Info + actions */}
        <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3">
          
          {/* Name + price */}
          <div>
            <p className="text-lg font-semibold">{item.name}</p>
            <p className="text-sm text-muted-foreground">
              ₹{item.price}
            </p>
          </div>

          {/* Quantity + remove */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => onDecrement(item._id)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-6 text-center text-sm">
                {item.quantity}
              </span>

              <Button
                size="icon"
                variant="outline"
                onClick={() => onIncrement(item._id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={() => onRemove(item._id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
