import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { setAddresses } from "../../features/address/addressSlice";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ManageAddresses = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const redirect = searchParams.get("redirect");
  const addressList = useSelector((state) => state.address.list);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/address/getAddress`,
          { withCredentials: true }
        );

        const data = Array.isArray(res.data.data)
          ? res.data.data
          : res.data.data
          ? [res.data.data]
          : [];

        dispatch(setAddresses(data));
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-muted-foreground">
        Loading addresses…
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Your Addresses
        </h1>
        <p className="text-muted-foreground">
          Manage where your orders are delivered
        </p>
      </div>

      <Separator />

      {/* Address List */}
      <div className="grid gap-4">
        {Array.isArray(addressList) && addressList.length > 0 ? (
          addressList.map((address) => (
            <Card
              key={address._id}
              className="bg-background/60 backdrop-blur-xl shadow-md hover:shadow-lg transition"
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

                <div className="text-sm text-muted-foreground">
                  📞 {address.phoneNumber}
                  {address.alternateNumber && (
                    <span className="ml-2">
                      • Alt: {address.alternateNumber}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-muted-foreground">
            No addresses saved yet.
          </div>
        )}
      </div>

      {/* Primary Action */}
      <div className="pt-6">
        <Link
          to={`/addressUpdate${
            redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""
          }`}
        >
          <Button size="lg" className="w-full sm:w-auto">
            Add New Address
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ManageAddresses;
