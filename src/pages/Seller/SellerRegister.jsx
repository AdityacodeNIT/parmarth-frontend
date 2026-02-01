import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userAPI } from "@/api/userAPI";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

const SellerRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    gstNumber: "",
    panNumber: "",
    businessName: "",
    businessType: "",
    businessAddress: "",
    pincode: "",
    contactNumber: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    avatar: null,
  });

  const [ifscLoading, setIfscLoading] = useState(false);
  const [ifscError, setIfscError] = useState("");
  const [isIfscVerified, setIsIfscVerified] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  // 🔹 IFSC → Bank Name Auto-fill
  const handleIfscChange = async (e) => {
    const ifsc = e.target.value.toUpperCase();
    setFormData({ ...formData, ifscCode: ifsc });

    if (ifsc.length !== 11) {
      setIfscError("");
      return;
    }

    try {
      setIfscLoading(true);
      setIfscError("");

      const res = await fetch(`https://ifsc.razorpay.com/${ifsc}`);
      if (!res.ok) {
      
        setIsIfscVerified(false);
        throw new Error("Invalid IFSC");
      }


      const data = await res.json();

      setFormData((prev) => ({
        ...prev,
        bankName: data.BANK,
      }));
      setIsIfscVerified(true);
    } catch (err) {
      setIfscError("Invalid IFSC code");
      setFormData((prev) => ({ ...prev, bankName: "" }));
    } finally {
      setIfscLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      payload.append(key, value)
    );

    try {
      const res = await userAPI.SellerRegister(payload);
      if (res.status >= 200 && res.status < 300) {
        navigate("/sellerLogin");
      }
    } catch (err) {
      console.error(" Seller registration failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Seller Registration</CardTitle>
          <CardDescription>
            Submit your details for seller verification
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Personal Info */}
            <section>
              <h3 className="mb-4 text-lg font-semibold">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input name="fullName" required onChange={handleChange} />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input type="email" name="email" required onChange={handleChange} />
                </div>

                <div>
                  <Label>Username</Label>
                  <Input name="username" required onChange={handleChange} />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input type="password" name="password" required onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Business Info */}
            <section>
              <h3 className="mb-4 text-lg font-semibold">
                Business Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Business Name</Label>
                  <Input name="businessName" required onChange={handleChange} />
                </div>

                <div>
                  <Label>Business Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, businessType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>GST Number</Label>
                  <Input name="gstNumber" required onChange={handleChange} />
                </div>

                <div>
                  <Label>PAN Number</Label>
                  <Input name="panNumber" required onChange={handleChange} />
                </div>

                <div className="md:col-span-2">
                  <Label>Business Address</Label>
                  <Input name="businessAddress" required onChange={handleChange} />
                </div>

                <div>
                  <Label>Pincode</Label>
                  <Input name="pincode" required onChange={handleChange} />
                </div>

                <div>
                  <Label>Contact Number</Label>
                  <Input name="contactNumber" required onChange={handleChange} />
                </div>
              </div>
            </section>

            {/* Bank Info */}
            <section>
              <h3 className="mb-4 text-lg font-semibold">
                Bank Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Account Holder Name</Label>
                  <Input
                    name="accountHolderName"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Account Number</Label>
                  <Input
                    name="accountNumber"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>IFSC Code</Label>
                  <Input
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleIfscChange}
                    placeholder="SBIN0001234"
                    required
                  />
                  {ifscLoading && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Fetching bank details...
                    </p>
                  )}
                  {ifscError && (
                    <p className="text-xs text-red-500 mt-1">
                      {ifscError}
                    </p>
                  )}
                </div>

             <div>
  <Label>Bank Name</Label>

  <div className="relative">
    <Input
      name="bankName"
      value={formData.bankName}
      readOnly
      required
      placeholder="Auto-filled from IFSC"
      className={`pr-10 bg-muted cursor-not-allowed
        ${isIfscVerified ? "border-green-500" : ""}
      `}
    />

    {isIfscVerified && (
      <CheckCircle
        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
        size={18}
      />
    )}
  </div>
</div>

              </div>
            </section>

            {/* Avatar */}
            <section>
              <h3 className="mb-4 text-lg font-semibold">
                Profile / Business Logo
              </h3>
              <Input type="file" required onChange={handleFileChange} />
            </section>

            <Button className="w-full" size="lg">
              Submit for Verification
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already registered?{" "}
              <Link to="/sellerLogin" className="underline">
                Login here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerRegister;
