"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClientIcon } from "./client-icon";

export function LeclercAbout() {
  return (
    <section id="about" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="font-leclerc-accent text-3xl md:text-4xl font-normal mb-4 tracking-tight"
            style={{ color: "hsl(var(--brand-accent))" }}
          >
            Our Story
          </h2>
          <p className="font-leclerc-primary text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From a small Parisian family recipe to New York&apos;s beloved
            neighborhood bakery, Leclerc has been crafting authentic French
            pastries with love for over a decade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <div className="space-y-6 text-center sm:text-left">
            <div>
              <h3 className="font-leclerc-primary text-2xl font-medium mb-4 text-foreground tracking-tight">
                A Family Tradition
              </h3>
              <p className="font-leclerc-support text-muted-foreground leading-relaxed max-w-xl mx-auto sm:mx-0">
                Founded by Marie and Pierre Leclerc in 2012, our bakery started
                with a simple dream: to bring the authentic taste of French
                pastries to New York City. Using recipes passed down through
                four generations of bakers, we combine traditional techniques
                with the finest ingredients.
              </p>
            </div>

            <div>
              <h3 className="font-leclerc-primary text-2xl font-medium mb-4 text-foreground tracking-tight">
                Artisanal Excellence
              </h3>
              <p className="font-leclerc-support text-muted-foreground leading-relaxed max-w-xl mx-auto sm:mx-0">
                Every croissant is hand-rolled, every cookie is carefully
                shaped, and every pastry is baked fresh daily. We believe in the
                art of slow baking, allowing our dough to develop complex
                flavors that transport you straight to the streets of Paris.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 gap-4 pt-4 max-w-xs mx-auto sm:max-w-none">
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: "hsl(var(--brand-accent))" }}
                >
                  12+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years of Excellence
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: "hsl(var(--brand-accent))" }}
                >
                  100%
                </div>
                <div className="text-sm text-muted-foreground">Fresh Daily</div>
              </div>
            </div>
          </div>

          {/* Image and Features */}
          <div className="space-y-6">
            <div className="relative">
              <img
                src="/images/leclerc-bakery/our-story.webp"
                alt="Marie and Pierre Leclerc in their bakery"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <Badge className="absolute bottom-4 left-4 bg-background text-foreground">
                Est. 2012
              </Badge>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="h-full">
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <ClientIcon
                    name="Award"
                    className="h-8 w-8 mx-auto mb-3 text-primary"
                  />
                  <h4 className="font-semibold mb-2">Award Winning</h4>
                  <p className="text-sm text-muted-foreground">
                    Best French Bakery NYC 2023
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <ClientIcon
                    name="Users"
                    className="h-8 w-8 mx-auto mb-3 text-primary"
                  />
                  <h4 className="font-semibold mb-2">Family Owned</h4>
                  <p className="text-sm text-muted-foreground">
                    Four generations of bakers
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <ClientIcon
                    name="Leaf"
                    className="h-8 w-8 mx-auto mb-3 text-primary"
                  />
                  <h4 className="font-semibold mb-2">Organic</h4>
                  <p className="text-sm text-muted-foreground">
                    Locally sourced ingredients
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                  <ClientIcon
                    name="Heart"
                    className="h-8 w-8 mx-auto mb-3 text-primary"
                  />
                  <h4 className="font-semibold mb-2">Made with Love</h4>
                  <p className="text-sm text-muted-foreground">
                    Every item crafted by hand
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Our Journey
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full border-4 mx-auto mb-4 flex items-center justify-center text-white dark:text-white font-bold"
                style={{
                  backgroundColor: "hsl(var(--brand-accent))",
                  borderColor: "hsl(var(--brand-accent))",
                }}
              >
                2012
              </div>
              <h4 className="font-semibold mb-2">The Beginning</h4>
              <p className="text-sm text-muted-foreground">
                Marie and Pierre opened our first location in SoHo with just 5
                pastry recipes.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full border-4 mx-auto mb-4 flex items-center justify-center text-white dark:text-white font-bold"
                style={{
                  backgroundColor: "hsl(var(--brand-accent))",
                  borderColor: "hsl(var(--brand-accent))",
                }}
              >
                2018
              </div>
              <h4 className="font-semibold mb-2">Expansion</h4>
              <p className="text-sm text-muted-foreground">
                Opened our second location in Upper West Side and introduced our
                cookie line.
              </p>
            </div>

            <div className="text-center">
              <div
                className="w-12 h-12 rounded-full border-4 mx-auto mb-4 flex items-center justify-center text-white dark:text-white font-bold"
                style={{
                  backgroundColor: "hsl(var(--brand-accent))",
                  borderColor: "hsl(var(--brand-accent))",
                }}
              >
                2024
              </div>
              <h4 className="font-semibold mb-2">Today</h4>
              <p className="text-sm text-muted-foreground">
                Three locations serving thousands of happy customers with online
                ordering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
