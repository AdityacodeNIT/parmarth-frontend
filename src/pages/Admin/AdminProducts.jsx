import { useState } from "react";
import Productlist from "./Productlist";
import { Button } from "@/components/ui/button";

const AdminProducts = () => {
  const [status, setStatus] = useState("pending");

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button
          variant={status === "pending" ? "default" : "outline"}
          onClick={() => setStatus("pending")}
        >
          Pending Products
        </Button>

        <Button
          variant={status === "approved" ? "default" : "outline"}
          onClick={() => setStatus("approved")}
        >
          Approved Products
        </Button>
      </div>

      <Productlist status={status} />
    </div>
  );
};

export default AdminProducts;
