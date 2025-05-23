import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Compass, Mail, TreePalmIcon as PalmTree, Globe, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <PalmTree className="h-6 w-6 text-teal-500" />
            <span className="text-xl font-bold tracking-wider">VIBETRAVEL.CLUB</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#guides" className="text-sm font-medium hover:text-teal-500 transition-colors">
              Travel Guides
            </Link>
            <Link href="#services" className="text-sm font-medium hover:text-teal-500 transition-colors">
              Services
            </Link>
            <Link href="#subscribe" className="text-sm font-medium hover:text-teal-500 transition-colors">
              Subscribe
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-teal-500 transition-colors">
              Contact
            </Link>
          </nav>
          <div>
            <Button variant="default" className="bg-teal-500 hover:bg-teal-600">
              Join the Club
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-image.jpg"
              alt="Tropical beach paradise"
              fill
              priority
              className="object-cover brightness-[0.85]"
            />
          </div>
          <div className="container relative z-10 flex flex-col items-center text-center gap-6 px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-md">
              Discover Your Perfect <span className="text-teal-400">Vibe</span>
            </h1>
            <p className="max-w-[800px] text-lg md:text-xl text-white/90 drop-shadow">
              Curated travel guides and personalized itineraries for the modern explorer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white">
                Explore Guides
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                Plan Your Trip
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Destinations */}
        <section id="guides" className="py-20 bg-white">
          <div className="container px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ultimate Travel Guides</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Carefully curated guides to help you experience the best each destination has to offer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Bali Bliss",
                  description: "Discover hidden temples, pristine beaches, and the best local cuisine",
                  image: "/bali.jpg",
                  icon: <PalmTree className="h-5 w-5" />,
                },
                {
                  title: "Tokyo Wonders",
                  description: "Navigate the bustling metropolis with insider tips on food, culture and nightlife",
                  image: "/tokyo.jpg",
                  icon: <Globe className="h-5 w-5" />,
                },
                {
                  title: "Costa Rica Adventure",
                  description: "Explore rainforests, volcanoes and beaches in this eco-paradise",
                  image: "/costa-rica.jpg",
                  icon: <Compass className="h-5 w-5" />,
                },
              ].map((guide, index) => (
                <Card key={index} className="overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      {guide.icon}
                      <span className="font-medium">{guide.title}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">{guide.description}</p>
                    <Button variant="link" className="p-0 text-teal-600 hover:text-teal-700">
                      Read the guide →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50">
                View All Guides
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-slate-50">
          <div className="container px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Customized Travel Planning</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Let us create your perfect itinerary based on your preferences, budget, and travel style
              </p>
            </div>

            <Tabs defaultValue="weekend" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="weekend">Weekend Getaway</TabsTrigger>
                <TabsTrigger value="week">Week-long Adventure</TabsTrigger>
                <TabsTrigger value="custom">Custom Journey</TabsTrigger>
              </TabsList>

              {["weekend", "week", "custom"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-0">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative h-[400px] rounded-xl overflow-hidden">
                      <Image src={`/${tab}-trip.jpg`} alt="Travel planning" fill className="object-cover" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">
                        {tab === "weekend"
                          ? "Perfect Weekend Escape"
                          : tab === "week"
                            ? "Week of Exploration"
                            : "Your Dream Journey"}
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
                              <Compass className="h-4 w-4 text-teal-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{feature.title}</h4>
                              <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Button className="bg-teal-500 hover:bg-teal-600 mt-4">Get Started</Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Happy Travelers</h2>
              <p className="text-muted-foreground max-w-[700px]">
                See what our community has to say about their VibeTravel experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "The Bali guide saved our trip! We discovered amazing places we would have never found on our own.",
                  name: "Sarah K.",
                  location: "New York",
                },
                {
                  quote:
                    "Their custom itinerary service was worth every penny. Our anniversary trip to Japan was absolutely perfect.",
                  name: "Michael & Lisa",
                  location: "Toronto",
                },
                {
                  quote:
                    "I've been using VibeTravel guides for years. They never disappoint with their local insights and tips.",
                  name: "James T.",
                  location: "London",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="italic text-muted-foreground flex-1">"{testimonial.quote}"</p>
                    <div className="mt-6 pt-6 border-t">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {testimonial.location}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe Section */}
        <section id="subscribe" className="py-20 bg-teal-50">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Vibe Travel Club</h2>
                  <p className="text-muted-foreground mb-6">
                    Subscribe to our newsletter for exclusive travel tips, guides, and special offers
                  </p>
                  <form className="space-y-4">
                    <div>
                      <Input type="text" placeholder="Your name" className="border-slate-200" />
                    </div>
                    <div>
                      <Input type="email" placeholder="Your email" className="border-slate-200" />
                    </div>
                    <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                      Subscribe to Beehiiv Blog
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground mt-4">
                    By subscribing, you agree to our privacy policy and terms of service.
                  </p>
                </div>
                <div className="relative hidden md:block">
                  <Image src="/subscribe-image.jpg" alt="Join our travel community" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-slate-900 text-white">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-slate-300 mb-8">
                  Have questions about our guides or services? Want to collaborate? We'd love to hear from you!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Email us at</p>
                      <p className="font-medium">hello@vibetravel.club</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <Users className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Follow us</p>
                      <div className="flex gap-4 mt-1">
                        <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                          Instagram
                        </a>
                        <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                          Twitter
                        </a>
                        <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors">
                          TikTok
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your name"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your email"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your message"
                      className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 min-h-[120px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <PalmTree className="h-6 w-6 text-teal-500" />
                <span className="text-xl font-bold tracking-wider text-white">VIBETRAVEL.CLUB</span>
              </div>
              <p className="max-w-md">
                Curated travel guides and personalized itineraries for the modern explorer. Join our community of
                passionate travelers.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Travel Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-teal-400 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-6 text-center text-sm">
            <p>© 2024 VibeTravel.club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
