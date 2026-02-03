import React, {useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OrderDetails = () => {
  const { orderDetails } = useSelector((state) => state.order);
  const [cancellationStatus, setCancellationStatus] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
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
    console.log('Attempting to cancel order:', id);
    setCancellingOrderId(id);
    setCancellationStatus('Cancelling order...');
    
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/shiprocket/cancelOrder/${id}`,
        {},
        { withCredentials: true }
      );
      
      console.log('Cancel order response:', res);
      
      if (res.status === 200) {
        setCancellationStatus(
          "✅ Cancellation request sent successfully! " +
          "Note: It may take a few minutes for the shipping partner to update the status. " +
          "Please check back in 2-3 minutes or click 'Back' and refresh the orders page."
        );
      }
    } catch (error) {
      console.error('Cancel order error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Unable to cancel order';
      setCancellationStatus(`Error: ${errorMsg}`);
      setCancellingOrderId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Order Summary</h1>

      {/* Info Banner */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <div className="text-amber-600 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-amber-900 font-medium">
              Status updates may be delayed
            </p>
            <p className="text-xs text-amber-800 mt-1">
              Order changes (like cancellations) are processed by our shipping partner Shiprocket. It typically takes 2-5 minutes for status updates to reflect in their system. Please be patient and refresh this page after a few minutes to see the updated status.
            </p>
          </div>
        </div>
      </div>

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

              <div className="flex flex-wrap gap-4 justify-between items-center">
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
                  disabled={
                    order.status === "Delivered" || 
                    order.status === "Cancelled" ||
                    order.status === "Canceled" ||
                    cancellingOrderId === order.id
                  }
                  onClick={() => handleCancelOrder(order.id)}
                  className="min-w-[140px]"
                >
                  {cancellingOrderId === order.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel Order
                    </>
                  )}
                </Button>
              </div>

              {cancellationStatus && (
                <div className={`mt-4 p-3 rounded-lg ${
                  cancellationStatus.includes('success') 
                    ? 'bg-green-100 text-green-800 border border-green-300' 
                    : cancellationStatus.includes('Error')
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-blue-100 text-blue-800 border border-blue-300'
                }`}>
                  <p className="text-sm font-medium">{cancellationStatus}</p>
                </div>
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
