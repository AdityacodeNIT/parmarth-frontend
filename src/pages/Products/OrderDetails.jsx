import React, { useContext, useState } from "react";
import {
  Truck,
  CreditCard,
  User,
  MapPin,
  Package,
  XCircle,
  Printer,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OrderDetails = () => {
  const { getUserDetail } = useContext(UserContext);
  const { orderDetails } = useSelector((state) => state.order);
  const [cancellationStatus, setCancellationStatus] = useState(null);
  const navigate = useNavigate();

  const orders = Array.isArray(orderDetails)
    ? orderDetails
    : orderDetails
    ? [orderDetails]
    : [];

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading order details…</p>
      </div>
    );
  }

  const handleCancelOrder = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/shiprocket/cancelOrder/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        setCancellationStatus("Order cancelled successfully.");
        getUserDetail();
      }
    } catch {
      setCancellationStatus("Unable to cancel order.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Order Summary</h1>

      <div className="max-w-6xl mx-auto space-y-10">
        {orders.map((order, idx) => (
          <Card key={order.id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-sm underline">
                Order #{idx + 1} · {order.channel_order_id}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* INFO GRID */}
              <div className="grid md:grid-cols-3 gap-6">
                <InfoBlock icon={Truck} title="Delivery">
                  <p>Status: {order.status}</p>
                  <p>Courier: {order.last_mile_courier_name || "—"}</p>
                </InfoBlock>

                <InfoBlock icon={CreditCard} title="Payment">
                  <p>Method: {order.payment_method}</p>
                  <p>Total: ₹{order.total}</p>
                </InfoBlock>

                <InfoBlock icon={User} title="Customer">
                  <p>{order.customer_name}</p>
                  <p>{order.customer_email}</p>
                </InfoBlock>
              </div>

              <Separator />

              {/* ADDRESS */}
              <InfoBlock icon={MapPin} title="Shipping Address">
                <p className="text-sm">
                  {order.customer_address}, {order.customer_city},{" "}
                  {order.customer_state} - {order.customer_pincode}
                </p>
              </InfoBlock>

              {/* ITEMS */}
              {order.products?.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="w-5 h-5 text-muted-foreground" />
                      <h3 className="font-semibold">Items</h3>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="border-b">
                          <tr className="text-muted-foreground">
                            <th className="py-2 text-left">Product</th>
                            <th className="py-2">Qty</th>
                            <th className="py-2">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((item, i) => (
                            <tr key={i} className="border-b">
                              <td className="py-2">{item.name}</td>
                              <td className="text-center">{item.quantity}</td>
                              <td className="text-center">₹{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {/* ACTIONS */}
              <Separator />

              <div className="flex flex-wrap gap-4 justify-between">
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>

                  <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                </div>

                <Button
                  variant="destructive"
                  disabled={order.status === "Delivered"}
                  onClick={() => handleCancelOrder(order.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel Order
                </Button>
              </div>

              {cancellationStatus && (
                <p className="text-sm text-muted-foreground">
                  {cancellationStatus}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* ---------- Small reusable block ---------- */
const InfoBlock = ({ icon: Icon, title, children }) => (
  <div className="rounded-xl border bg-card p-4 space-y-2">
    <div className="flex items-center gap-2 text-sm font-semibold">
      <Icon className="w-4 h-4 text-muted-foreground" />
      {title}
    </div>
    <div className="text-sm text-muted-foreground space-y-1">
      {children}
    </div>
  </div>
);

export default OrderDetails;
