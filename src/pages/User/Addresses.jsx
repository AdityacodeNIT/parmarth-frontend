import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddress, setSelectedAddressId } from "../../features/address/addressSlice";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Addresses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: addressList, loading, error } = useSelector(
    (state) => state.address
  );

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const handleSelect = (id) => {
    dispatch(setSelectedAddressId(id));
    navigate("/buyproduct");
  };

  const handleAddAddress = () => {
    navigate("/addressUpdate");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-muted-foreground">
        Loading addresses…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            Choose Delivery Address
          </h1>
          <p className="text-muted-foreground">
            Select where you want your order delivered
          </p>
        </div>

        <Separator />

        {/* Address Grid */}
        {Array.isArray(addressList) && addressList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addressList.map((address) => (
              <Card
                key={address._id}
                onClick={() => handleSelect(address._id)}
                className="cursor-pointer bg-background/60 backdrop-blur-xl
                           shadow-md hover:shadow-xl transition rounded-2xl"
              >
                <CardContent className="p-5 space-y-2">
                  <div className="font-medium text-lg">
                    {address.firstName} {address.lastName}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {address.streetAddress}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {address.city}, {address.state} – {address.postalCode}
                  </div>

                  {address.country && (
                    <div className="text-sm text-muted-foreground">
                      {address.country}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground text-center">
            No saved addresses yet.
          </div>
        )}

        {/* Primary Action */}
        <div className="pt-6 flex justify-center">
          <Button
            size="lg"
            onClick={handleAddAddress}
          >
            Add New Address
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
