"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconMotion from '@/components/IconMotion';
import { Compass } from "lucide-react";
import { smoothScrollTo } from '@/lib/utils';

export default function ServicesTabs() {
  return (
    <Tabs defaultValue="weekend" className="max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="weekend">Weekend Getaway</TabsTrigger>
        <TabsTrigger value="week">Week-long Adventure</TabsTrigger>
        <TabsTrigger value="custom">Custom Journey</TabsTrigger>
      </TabsList>
      {['weekend', 'week', 'custom'].map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-0">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-black/40 rounded-lg p-8">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image src={`/${tab}-trip.jpg`} alt="Travel planning" fill className="object-cover" />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                {tab === 'weekend'
                  ? 'Perfect Weekend Escape'
                  : tab === 'week'
                  ? 'Week of Exploration'
                  : 'Your Dream Journey'}
              </h3>
              <ul className="space-y-4">
                {[
                  {
                    title: "Personalized Itinerary",
                    description: "Tailored to your interests and travel style",
                  },
                  {
                    title: "Local Recommendations",
                    description: "Hidden gems and authentic experiences",
                  },
                  {
                    title: "Booking Assistance",
                    description: "Help with accommodations and activities",
                  },
                ].map((feature, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="mt-1 bg-teal-100 rounded-full p-1">
                      <IconMotion>
                        <Compass className="h-4 w-4 text-teal-600" />
                      </IconMotion>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{feature.title}</h4>
                      <p className="text-sm text-white/90">{feature.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button
                className="bg-teal-500 hover:bg-teal-600 mt-4"
                type="button"
                onClick={() => smoothScrollTo('contact')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
} 