"use client";
import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Heart, Loader2 } from 'lucide-react';
import IconMotion from './IconMotion';
import { useToast } from '@/contexts/ToastContext';
import { motion } from 'framer-motion';

interface ItineraryFormData {
  name: string;
  email: string;
  destination: string;
  travelDates: string;
  travelers: string;
  interests: string;
  budget: string;
  message: string;
}

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const [itineraryStatus, setItineraryStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle');
  const { showToast } = useToast();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Refs for itinerary form
  const itineraryNameRef = useRef<HTMLInputElement>(null);
  const itineraryEmailRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const travelDatesRef = useRef<HTMLInputElement>(null);
  const travelersRef = useRef<HTMLInputElement>(null);
  const interestsRef = useRef<HTMLTextAreaElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);
  const itineraryMessageRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const name = nameRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const message = messageRef.current?.value || '';
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) {
      setStatus('success');
      showToast({
        title: "Message sent successfully!",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "success"
      });
      if (nameRef.current) nameRef.current.value = '';
      if (emailRef.current) emailRef.current.value = '';
      if (messageRef.current) messageRef.current.value = '';
    } else {
      setStatus('error');
      showToast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again or email us directly.",
        variant: "error"
      });
    }
  }

  async function handleItinerarySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setItineraryStatus('loading');
    
    const formData: ItineraryFormData = {
      name: itineraryNameRef.current?.value || '',
      email: itineraryEmailRef.current?.value || '',
      destination: destinationRef.current?.value || '',
      travelDates: travelDatesRef.current?.value || '',
      travelers: travelersRef.current?.value || '',
      interests: interestsRef.current?.value || '',
      budget: budgetRef.current?.value || '',
      message: itineraryMessageRef.current?.value || '',
    };

    const res = await fetch('/api/itinerary-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...formData, 
        type: 'itinerary_request',
        subject: `Custom Itinerary Request for ${formData.destination}` 
      }),
    });
    
    if (res.ok) {
      setItineraryStatus('success');
      showToast({
        title: "🎉 Itinerary request received!",
        description: "We'll craft your personalized travel plan and get back to you within 24 hours.",
        variant: "success",
        duration: 6000
      });
      // Clear form
      if (itineraryNameRef.current) itineraryNameRef.current.value = '';
      if (itineraryEmailRef.current) itineraryEmailRef.current.value = '';
      if (destinationRef.current) destinationRef.current.value = '';
      if (travelDatesRef.current) travelDatesRef.current.value = '';
      if (travelersRef.current) travelersRef.current.value = '';
      if (interestsRef.current) interestsRef.current.value = '';
      if (budgetRef.current) budgetRef.current.value = '';
      if (itineraryMessageRef.current) itineraryMessageRef.current.value = '';
    } else {
      setItineraryStatus('error');
      showToast({
        title: "Request failed",
        description: "Something went wrong. Please try again or contact us directly at hello@vibetravel.club",
        variant: "error"
      });
    }
  }

  return (
    <div className="space-y-8">
      {/* Personalized Itinerary Request Form */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <IconMotion>
              <MapPin className="h-6 w-6 text-teal-400" />
            </IconMotion>
            <h3 className="text-xl font-semibold text-white">Get Your Personalized Itinerary</h3>
          </div>
          <p className="text-slate-300 mb-6">
                         Tell us about your dream trip and we&apos;ll create a custom itinerary just for you. Our expert travel planners will craft the perfect experience based on your preferences.
          </p>
          
          <form className="space-y-4" onSubmit={handleItinerarySubmit} id="get-started-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your name *"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  ref={itineraryNameRef}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your email *"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  ref={itineraryEmailRef}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Destination *"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pl-10"
                  ref={destinationRef}
                  required
                />
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Travel dates *"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pl-10"
                  ref={travelDatesRef}
                  required
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Number of travelers *"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pl-10"
                  ref={travelersRef}
                  required
                />
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Budget range (optional)"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  ref={budgetRef}
                />
              </div>
            </div>
            
            <div className="relative">
              <Textarea
                placeholder="What are your interests? (e.g., culture, adventure, food, nightlife, nature, history) *"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px] pl-10"
                ref={interestsRef}
                required
              />
              <Heart className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            </div>
            
            <div>
              <Textarea
                placeholder="Any special requests or additional information?"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[80px]"
                ref={itineraryMessageRef}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-teal-500 hover:bg-teal-600 py-3 text-lg font-semibold" 
              disabled={itineraryStatus === 'loading'}
            >
              {itineraryStatus === 'loading' ? (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing Your Request...
                </motion.div>
              ) : (
                'Get My Personalized Itinerary'
              )}
            </Button>
            

          </form>
        </CardContent>
      </Card>

      {/* General Contact Form */}
      <Card className="bg-slate-800/30 border-slate-700">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">General Inquiries</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                type="text"
                placeholder="Your name"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                ref={nameRef}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                ref={emailRef}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Your message"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 min-h-[120px]"
                ref={messageRef}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-slate-600 hover:bg-slate-500" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </motion.div>
              ) : (
                'Send Message'
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
} 