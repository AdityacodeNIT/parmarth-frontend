import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  ClipboardCheck,
  Microscope,
  UserCheck,
  FileCheck,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const HowItWorks = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            How We Verify Food
          </h1>
          <p className="text-foreground/80 max-w-3xl mx-auto text-lg leading-relaxed">
            Every product on our platform goes through a structured verification
            process. We focus on clarity, ingredient transparency, and
            responsible health positioning.
          </p>
        </header>

        <Separator />

        {/* Core Commitment */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Shield className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Our Commitment</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed space-y-3">
            <p className="text-foreground/90">
              We are not a general marketplace. We are a health-first platform
              where trust comes before scale. Every product is reviewed against
              clear rules, and we ask brands to support their claims with
              verifiable information.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">What We Do</p>
                </div>
                <ul className="text-sm space-y-1 text-foreground/80">
                  <li>• Verify health claims with scientific sources</li>
                  <li>• Require complete ingredient transparency</li>
                  <li>• Enforce clear curation rules</li>
                  <li>• Reject products that don't meet standards</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">What We Don't Accept</p>
                </div>
                <ul className="text-sm space-y-1 text-foreground/80">
                  <li>• Misleading or unverified health claims</li>
                  <li>• Hidden or undisclosed ingredients</li>
                  <li>• Artificial colors or harmful additives</li>
                  <li>• Products without supporting evidence</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Process */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <ClipboardCheck className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Verification Process</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed space-y-6">
            <p className="text-foreground/90">
              Products go through multiple review stages before being listed:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Seller Application
                  </h3>
                  <p className="text-sm text-foreground/80">
                    Brands submit products with complete ingredient lists,
                    nutritional information, and supporting documentation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Curation Rules Check
                  </h3>
                  <p className="text-sm text-foreground/80">
                    Products are reviewed against our ingredient rules and
                    health standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Scientific Verification
                  </h3>
                  <p className="text-sm text-foreground/80">
                    Health claims are checked for scientific backing with
                    verifiable sources.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Nutritionist Review
                  </h3>
                  <p className="text-sm text-foreground/80">
                    Certified nutritionists review products for health
                    compliance and accuracy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Lab Testing (Selected Products)
                  </h3>
                  <p className="text-sm text-foreground/80">
                    Some products undergo third-party lab testing to verify
                    nutritional claims.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  6
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Final Approval
                  </h3>
                  <p className="text-sm text-foreground/80">
                    Only products that pass all checks are approved for listing.
                    Rejection is common and expected.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Curation Rules */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <FileCheck className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Curation Rules</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed space-y-4">
            <p className="text-foreground/90">
              Products must meet these non-negotiable standards:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground font-semibold">
                    Full Ingredient Disclosure
                  </strong>
                  <p className="text-sm text-foreground/80">
                    Every ingredient must be listed with complete transparency.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground font-semibold">
                    No Misleading Claims
                  </strong>
                  <p className="text-sm text-foreground/80">
                    Health claims must be backed by scientific evidence with
                    verifiable sources.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground font-semibold">
                    Sweetener Declaration
                  </strong>
                  <p className="text-sm text-foreground/80">
                    All sweeteners must be clearly declared with their exact
                    type.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground font-semibold">
                    Oil & Preservative Clarity
                  </strong>
                  <p className="text-sm text-foreground/80">
                    Type of oils and preservatives must be specified. Generic
                    terms are not accepted.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground font-semibold">
                    No Artificial Colors
                  </strong>
                  <p className="text-sm text-foreground/80">
                    Products containing artificial food coloring are
                    automatically rejected.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-foreground font-semibold">
                    Shelf-life & Storage
                  </strong>
                  <p className="text-sm text-foreground/80">
                    Clear storage instructions and expiry information must be
                    provided.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Scientific Proof */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Microscope className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Scientific Proof Requirement</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed space-y-4">
            <p className="text-foreground/90">
              We don't accept "obvious" claims without proof. Even if everyone
              knows guava has Vitamin C, we require scientific sources. This is
              our defense mechanism against misleading marketing.
            </p>
            <div className="border rounded-lg p-4 space-y-2">
              <p className="font-semibold text-foreground">
                What We Require for Every Claim:
              </p>
              <ul className="text-sm space-y-1 text-foreground/80">
                <li>• Research paper title with full citation</li>
                <li>• Publication source (journal name and year)</li>
                <li>• Verifiable link (URL or DOI)</li>
                <li>• Peer-reviewed source confirmation</li>
              </ul>
            </div>
            <p className="text-sm text-foreground/80">
              <strong className="text-foreground font-semibold">Example:</strong> If a
              product claims "High in Vitamin C," the seller must provide
              research papers showing the exact Vitamin C content, its
              bioavailability, and health benefits with proper citations.
            </p>
          </CardContent>
        </Card>

        {/* Verification Badges */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <UserCheck className="h-6 w-6 text-muted-foreground" />
            <CardTitle>Verification Badges</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed space-y-4">
            <p className="text-foreground/90">
              Look for these badges on product pages to understand their
              verification status:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <p className="font-semibold text-foreground mb-1">
                  Nutritionist Approved
                </p>
                <p className="text-sm text-foreground/80">Verified by certified nutritionists</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-semibold text-foreground mb-1">Lab Tested</p>
                <p className="text-sm text-foreground/80">Third-party laboratory verified</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-semibold text-foreground mb-1">
                  Ingredients Verified
                </p>
                <p className="text-sm text-foreground/80">
                  All ingredients disclosed and verified
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="font-semibold text-foreground mb-1">
                  Claims Verified
                </p>
                <p className="text-sm text-foreground/80">
                  Health claims backed by scientific evidence
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-8">
          Trust through transparency. Health first, always.
        </footer>
      </section>
    </main>
  );
};

export default HowItWorks;
