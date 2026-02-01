import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Leaf,
  History,
  ClipboardCheck,
  Phone,
} from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className=" text-4xl md:text-5xl font-semibold tracking-tight">
            About Eat Healthy
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Eat Healthy is an early-stage marketplace built with a simple idea:
            choosing packaged food should feel safe, clear, and informed — not confusing or risky.
          </p>
        </header>

        <Separator />

        {/* Purpose */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Leaf className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Why We Exist</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            Many packaged foods are marketed as “healthy,” but it’s often hard to
            understand what that really means. Ingredient lists are complex,
            claims are unclear, and trust is left entirely to the brand.
            <br /><br />
            Eat Healthy exists to make food choices easier by focusing on clarity,
            basic rules, and visible reasoning — especially for people who want to
            be more mindful about what they eat.
          </CardContent>
        </Card>

        {/* Approach */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <ClipboardCheck className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Our Approach</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              We are starting small and carefully.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Products are reviewed against simple ingredient rules</li>
              <li>Brands are asked to share supporting information where possible</li>
              <li>Health-related positioning is kept limited and responsible</li>
              <li>Clear explanations are prioritized over marketing language</li>
            </ul>
            <p>
              We don’t claim perfection. This platform is evolving, and our
              standards will improve as we learn.
            </p>
          </CardContent>
        </Card>

        {/* Journey */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <History className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Where We Are Right Now</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            Eat Healthy is at an early stage. We are beginning with a limited
            selection of packaged foods and a small set of rules, with the goal
            of gradually expanding categories, improving verification, and
            learning from real user feedback.
            <br /><br />
            Over time, we hope this grows into a more reliable and transparent
            way to discover food — but we believe that trust has to be earned,
            step by step.
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Phone className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            If you have feedback, questions, or would like to understand our
            approach better, you’re welcome to reach out through our contact
            channels. Thoughtful feedback helps us improve.
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-8">
          Built carefully. Improved continuously.
        </footer>

      </section>
    </main>
  );
};

export default About;
