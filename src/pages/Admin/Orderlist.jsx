import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Orderlist = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/shiprocket/getOrder`,
          { withCredentials: true }
        );
        setOrderData(response.data.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) return <div className="p-6">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "Shipped":
        return <Badge className="bg-blue-500">Shipped</Badge>;
      default:
        return <Badge className="bg-yellow-500">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>

      <CardContent>
        <ScrollArea className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orderData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.id}
                  </TableCell>

                  <TableCell>{order.customer_name}</TableCell>

                  <TableCell>
                    {order.customer_city}, {order.customer_state}
                  </TableCell>

                  <TableCell>
                    {getStatusBadge(order.status)}
                  </TableCell>

                  <TableCell>
                    {order.products?.length ? (
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {order.products.map((item, idx) => (
                          <li key={idx}>
                            {item.name} × {item.quantity || 1} — ₹
                            {item.selling_price}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">
                        No items
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="text-right font-semibold">
                    ₹{order.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Orderlist;
