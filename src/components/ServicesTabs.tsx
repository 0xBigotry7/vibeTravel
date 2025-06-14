"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconMotion from '@/components/IconMotion';
import AnimatedElement from '@/components/AnimatedElement';
import { Compass, DollarSign } from "lucide-react";

const serviceData = {
  weekend: {
    title: 'Perfect Weekend Escape',
    duration: '2-3 Days',
    startingPrice: '$149',
    features: [
      {
        title: "Personalized 48-72 Hour Itinerary",
        description: "Day-by-day schedule with dining, activities, and local hotspots",
      },
      {
        title: "Local Insider Recommendations",
        description: "Hidden gems and authentic experiences off the beaten path",
      },
      {
        title: "Booking Links & Contacts",
        description: "Direct reservation links and local contact information",
      },
      {
        title: "Mobile-Friendly Guide",
        description: "Easy-to-follow PDF optimized for your phone",
      },
    ]
  },
  week: {
    title: 'Week of Exploration',
    duration: '5-7 Days',
    startingPrice: '$299',
    features: [
      {
        title: "Comprehensive 7-Day Itinerary",
        description: "Detailed daily plans with multiple activity options per day",
      },
      {
        title: "Restaurant & Dining Guide",
        description: "Curated list of must-try restaurants for every meal",
      },
      {
        title: "Transportation Planning",
        description: "Local transport options and route optimization",
      },
      {
        title: "Emergency Contacts & Tips",
        description: "Local emergency numbers and cultural etiquette guide",
      },
    ]
  },
  custom: {
    title: 'Your Dream Journey',
    duration: 'Any Duration',
    startingPrice: '$199',
    features: [
      {
        title: "Fully Customized Itinerary",
        description: "Tailored to your exact interests, budget, and travel style",
      },
      {
        title: "Multiple Destination Options",
        description: "Perfect for complex trips or multi-city adventures",
      },
      {
        title: "24/7 Travel Support",
        description: "WhatsApp support during your trip for any questions",
      },
      {
        title: "Post-Trip Follow-up",
        description: "Feedback session and recommendations for future trips",
      },
    ]
  }
};

export default function ServicesTabs() {
  return (
    <div className="container px-4">
      <AnimatedElement variant="fadeUp" delay={0.2} className="flex flex-col items-center text-center mb-12 bg-black/40 rounded-lg p-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Travel Planning Services</h2>
        <p className="text-muted-foreground max-w-[700px] text-white/90">
          Professional itinerary planning with transparent pricing. Choose the perfect package for your next adventure.
        </p>
      </AnimatedElement>
      
      <Tabs defaultValue="weekend" className="max-w-5xl mx-auto">
        <AnimatedElement variant="scale" delay={0.4}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="weekend">Weekend Getaway</TabsTrigger>
            <TabsTrigger value="week">Week-long Adventure</TabsTrigger>
            <TabsTrigger value="custom">Custom Journey</TabsTrigger>
          </TabsList>
        </AnimatedElement>
        
        {Object.entries(serviceData).map(([tab, service]) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <AnimatedElement variant="fadeUp" delay={0.6} className="grid md:grid-cols-2 gap-8 items-center bg-black/40 rounded-lg p-8 hover:bg-black/50 transition-colors">
              <AnimatedElement variant="fadeRight" delay={0.8} className="relative h-[400px] rounded-xl overflow-hidden">
                <Image src={`/${tab}-trip.jpg`} alt="Travel planning" fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full font-semibold">
                  {service.duration}
                </div>
              </AnimatedElement>
              <AnimatedElement variant="fadeLeft" delay={1.0} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <IconMotion variant="bounce" delay={1.2}>
                      <DollarSign className="h-5 w-5 text-teal-400" />
                    </IconMotion>
                    <span className="text-2xl font-bold text-teal-400">{service.startingPrice}</span>
                    <span className="text-white/70">starting price</span>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <AnimatedElement key={index} variant="fadeUp" delay={1.4 + (index * 0.1)} className="flex gap-3">
                      <div className="mt-1 bg-teal-100 rounded-full p-1 flex-shrink-0">
                        <IconMotion variant="rotate" delay={1.5 + (index * 0.1)}>
                          <Compass className="h-4 w-4 text-teal-600" />
                        </IconMotion>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{feature.title}</h4>
                        <p className="text-sm text-white/90">{feature.description}</p>
                      </div>
                    </AnimatedElement>
                  ))}
                </ul>
                
                <AnimatedElement variant="scale" delay={1.8} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                  <p className="text-sm text-white/80 mb-3">
                    <strong>What&apos;s included:</strong> Personal consultation, detailed itinerary, local recommendations, and booking assistance.
                  </p>
                  <p className="text-xs text-white/60">
                    Final price may vary based on destination complexity and specific requirements.
                  </p>
                </AnimatedElement>
                
                <AnimatedElement variant="bounce" delay={2.0}>
                  <Button
                    className="bg-teal-500 hover:bg-teal-600 mt-4 w-full md:w-auto px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all"
                    type="button"
                    onClick={() => {
                      const element = document.getElementById('get-started-form');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                  >
                    Get Started - {service.startingPrice}
                  </Button>
                </AnimatedElement>
              </AnimatedElement>
            </AnimatedElement>
          </TabsContent>
        ))}
      </Tabs>
      
      <AnimatedElement variant="fadeUp" delay={2.2} className="mt-12 text-center bg-black/20 rounded-lg p-6 hover:bg-black/30 transition-colors">
        <p className="text-white/80 text-sm">
          <strong>Money-back guarantee:</strong> If you&apos;re not completely satisfied with your personalized itinerary, 
          we&apos;ll refund your payment within 7 days of delivery.
        </p>
      </AnimatedElement>
    </div>
  );
} 