import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const BillSummary = ({
  isCartCheckout,
  items,
  product,
  quantity,
  serviceabilityResult,
  paymentMethod,
  setPaymentMethod,
  handleCheckout,
}) => {
  const cartSubtotal = items?.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0
  );

  const tax = Math.ceil(
    isCartCheckout
      ? cartSubtotal * 0.05
      : product.price * quantity * 0.05
  );

  const delivery = Math.ceil(serviceabilityResult?.deliveryCharge || 0);

  const total = Math.ceil(
    (isCartCheckout
      ? cartSubtotal * 1.18
      : product.price * quantity * 1.18) + delivery
  );

  return (
    <Card className="sticky top-24 border-none shadow-xl bg-background/80 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Order summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* ITEMS */}
        <div className="space-y-3 text-sm">
          {isCartCheckout ? (
            items.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))
          ) : (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {product.name} × {quantity}
              </span>
              <span>₹{product.price * quantity}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* PRICE BREAKUP */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Tax (5%)</span>
            <span>₹{tax}</span>
          </div>

          <div className="flex justify-between text-muted-foreground">
            <span>Delivery</span>
            <span>₹{delivery}</span>
          </div>
        </div>

        <Separator />

        {/* TOTAL */}
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* PAYMENT */}
        {serviceabilityResult?.available && (
          <div className="space-y-3">
            <p className="text-lg font-medium">
              Payment method
            </p>

            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-2"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Prepaid" id="prepaid" />
                <label htmlFor="prepaid">Pay now</label>
              </div>

              {serviceabilityResult.cod && (
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <label htmlFor="cod">Cash on delivery</label>
                </div>
              )}
            </RadioGroup>
          </div>
        )}

        {/* CTA */}
        <Button
          size="lg"
          className="w-full"
          disabled={!serviceabilityResult?.available || !paymentMethod}
          onClick={handleCheckout}
        >
          Proceed to checkout
        </Button>

      </CardContent>
    </Card>
  );
};

export default BillSummary;
