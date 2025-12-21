import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Rocket,
  History,
  PackageCheck,
  Phone,
} from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Parmarth
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Parmarth is a modern e-commerce marketplace focused on delivering
            reliable stationery, office essentials, and productivity tools for
            individuals, institutions, and businesses.
          </p>
        </header>

        <Separator />

        {/* Mission */}
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <Rocket className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            Our mission is to simplify access to high-quality stationery and
            workplace essentials by combining thoughtful curation, reliable
            logistics, and a seamless digital experience. We aim to support
            productivity across education, startups, and enterprises.
          </CardContent>
        </Card>

        {/* Journey */}
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <History className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Our Journey</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            Parmarth was founded with a clear focus: to modernize how stationery
            and office supplies are discovered, purchased, and delivered.
            Starting from essential supplies, we continue to expand into smarter
            and more efficient tools that meet evolving professional needs.
          </CardContent>
        </Card>

        {/* Offerings */}
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <PackageCheck className="h-6 w-6 text-muted-foreground" />
            <CardTitle>What We Offer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <ul className="list-disc list-inside space-y-2">
              <li>Curated stationery and office essentials</li>
              <li>Products suited for students, professionals, and businesses</li>
              <li>Bulk and institutional purchasing support</li>
              <li>Reliable logistics and transparent order tracking</li>
              <li>Customer-focused service and ongoing platform improvements</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center gap-4">
            <Phone className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            For partnerships, institutional orders, or support inquiries, please
            reach out through our official contact channels. Our team is committed
            to timely and transparent communication.
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-8">
          Building dependable commerce experiences for modern workspaces.
        </footer>

      </section>
    </main>
  );
};

export default About;
