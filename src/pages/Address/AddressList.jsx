import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AddressList = ({
  addressList,
  addressId,
  onSelect,
  checkingDelivery,
  serviceabilityResult,
  handleManageAddresses
}) => {
  return (
    <Card className="bg-background/60 backdrop-blur-xl shadow-xl rounded-2xl">
      <CardContent className="p-6 space-y-6">

        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            Delivery Address
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose where you want your order delivered
          </p>
        </div>

        {/* Serviceability Status */}
        {checkingDelivery && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="animate-spin">⏳</span>
            Checking delivery availability…
          </div>
        )}

        {!checkingDelivery && serviceabilityResult && (
          <div
            className={`text-sm font-medium ${
              serviceabilityResult.available
                ? "text-emerald-500"
                : "text-red-500"
            }`}
          >
            {serviceabilityResult.available
              ? `✓ Delivery available • ETA ${serviceabilityResult.eta}`
              : "Delivery not available for this location"}
          </div>
        )}

        <Separator />

        {/* Address Cards */}
        <div className="space-y-4">
          {Array.isArray(addressList) && addressList.length > 0 ? (
            addressList.map((addr) => {
              const isSelected = addr._id === addressId;

              return (
                <button
                  key={addr._id}
                  onClick={() => onSelect(addr._id)}
                  className={`w-full text-left rounded-xl p-4 transition-all
                    ${
                      isSelected
                        ? "bg-primary/10 shadow-md ring-2 ring-primary"
                        : "hover:bg-muted"
                    }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {addr.firstName} {addr.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {addr.streetAddress}, {addr.city}, {addr.state} –{" "}
                        {addr.postalCode}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        📞 {addr.phoneNumber}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="text-xs font-semibold text-primary">
                        Selected
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              No saved addresses yet
            </p>
          )}
        </div>

        {/* Primary Action */}
        <Button
          size="lg"
          className="w-full mt-2"
          onClick={handleManageAddresses}
        >
          {Array.isArray(addressList) && addressList.length > 0
            ? "Change Address"
            : "Add Address"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddressList;
