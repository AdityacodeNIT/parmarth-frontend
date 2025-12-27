import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdAdminPanelSettings } from "react-icons/md";

import Orderlist from "./Orderlist";
import Userlist from "./Userlist";
import Productlist from "./Productlist";
import SellerApprovalPanel from "./SellerApprovalPanel";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AdminSection = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ───────────────── Header ───────────────── */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl flex items-center gap-2">
                Admin Dashboard <MdAdminPanelSettings />
              </CardTitle>
              <CardDescription>
                Manage users, products, orders, and sellers
              </CardDescription>
            </div>
            <Badge variant="secondary" className="capitalize">
              {role}
            </Badge>
          </CardHeader>
        </Card>

        {/* ───────────────── Content ───────────────── */}
        <Card>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">

              {/* USERS */}
              {role !== "seller" && (
                <AccordionItem value="users">
                  <AccordionTrigger className="px-6">
                    User Management
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <Userlist />
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* PRODUCTS */}
              <AccordionItem value="products">
                <AccordionTrigger className="px-6">
                  Product Management
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <Productlist />
                </AccordionContent>
              </AccordionItem>

              {/* ORDERS */}
              <AccordionItem value="orders">
                <AccordionTrigger className="px-6">
                  Order Management
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <Orderlist />
                </AccordionContent>
              </AccordionItem>

              {/* SELLERS (SUPERADMIN ONLY) */}
              {role === "superadmin" && (
                <AccordionItem value="sellers">
                  <AccordionTrigger className="px-6">
                    Seller Approvals
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <SellerApprovalPanel />
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </CardContent>
        </Card>

        {/* ───────────────── Actions ───────────────── */}
        <Card>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
            <div>
              <h3 className="text-lg font-semibold">Quick Action</h3>
              <p className="text-sm text-muted-foreground">
                Add new products to the marketplace
              </p>
            </div>

            <Button asChild size="lg" >
              <Link to="/add-product" className="text-foreground!">Add New Product</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default AdminSection;
