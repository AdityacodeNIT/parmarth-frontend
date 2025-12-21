import React, { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/subscribe`,
        { email }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage("Subscription successful. Check your email for updates.");
        setEmail("");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("Error subscribing. Please try again.");
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-10 text-center space-y-6">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Stay updated
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Subscribe to receive updates about new arrivals, offers, and
            announcements.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />

            <Button onClick={handleSubscribe} className="h-11 gap-2">
              Subscribe
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Message */}
          {message && (
            <p className="text-sm text-muted-foreground">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default SubscribeSection;
