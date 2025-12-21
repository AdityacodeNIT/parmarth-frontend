import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartSummary({
  totalPrice,
  summaryLine,
  addressId,
  addressList,
  onCheckout,
}) {
  const tax = Math.ceil(totalPrice * 0.18);
  const total = Math.ceil(totalPrice * 1.18);

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-xl">
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Totals */}
        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            {summaryLine}
          </p>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (18%)</span>
            <span>₹{tax}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <p className="font-medium">
            Shipping Address
          </p>

          {addressId ? (
            <div className="rounded-md border border-border p-3 text-sm space-y-1">
              <p>
                Address ID: <span className="font-medium">{addressId}</span>
              </p>
              <p className="text-muted-foreground">
                You can manage your saved addresses below.
              </p>
            </div>
          ) : (
            <div className="rounded-md border border-border p-3 text-sm text-muted-foreground">
              No address selected. Please add or select an address.
            </div>
          )}

          <Link to="/address">
            <Button variant="outline" size="sm">
              {addressList.length === 0 ? "Add Address" : "Manage Addresses"}
            </Button>
          </Link>
        </div>

        {/* Checkout */}
        <Button size="lg" className="w-full" onClick={onCheckout}>
          Go to Checkout
        </Button>
      </CardContent>
    </Card>
  );
}
