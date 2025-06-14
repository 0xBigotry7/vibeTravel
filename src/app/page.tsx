import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Mail, TreePalmIcon as PalmTree, Users, Heart } from "lucide-react"
import { fetchBeehiivPosts } from '@/lib/fetchBeehiivPosts'
import HeroSection from '@/components/HeroSection'
import AnimatedSection from '@/components/AnimatedSection'
import AnimatedElement from '@/components/AnimatedElement'
import AnimatedNumber from '@/components/AnimatedNumber'
import IconMotion from '@/components/IconMotion'
import Header from '@/components/Header'
import ServicesTabs from '@/components/ServicesTabs'
import ContactForm from '@/components/ContactForm'
import InteractiveTestimonials from '@/components/InteractiveTestimonials'
import FAQSection from '@/components/FAQSection'

interface BeehiivPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export default async function Home() {
  const posts: BeehiivPost[] = await fetchBeehiivPosts('https://rss.beehiiv.com/feeds/EiaFGtMMhr.xml', 5)
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* Ultimate Travel Guides (Beehiiv Blog) */}
        <AnimatedSection id="guides" className="py-20" variant="parallax" parallaxOffset={30}>
          <div className="container px-4">
            <AnimatedElement variant="fadeUp" delay={0.1} className="flex flex-col items-center text-center mb-12 bg-black/40 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ultimate Travel Guides</h2>
              <p className="text-muted-foreground max-w-[700px] text-white/90">
                Latest stories and tips from our Beehiiv-powered travel blog
              </p>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: BeehiivPost, index) => (
                <AnimatedElement 
                  key={post.link} 
                  variant="fadeUp" 
                  delay={0.1 * (index % 3)} 
                  className="overflow-hidden group bg-black/40 rounded-lg transform hover:scale-105 transition-transform duration-300"
                >
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
                          {post.title}
                        </a>
                      </h3>
                      <p className="text-muted-foreground mb-4 text-white/90" dangerouslySetInnerHTML={{ __html: post.description }} />
                      <span className="text-xs text-gray-300">{new Date(post.pubDate).toLocaleDateString()}</span>
                    </CardContent>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </AnimatedSection>
        {/* Services Section */}
        <AnimatedSection id="services" className="py-20" variant="fadeLeft" delay={0.1}>
          <ServicesTabs />
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection className="py-20" variant="scale" delay={0.1} id="testimonials">
          <div className="container px-4">
            <AnimatedElement variant="fadeDown" delay={0.1} className="flex flex-col items-center text-center mb-12 bg-black/40 rounded-lg p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">What Travelers Say</h2>
              <p className="text-muted-foreground max-w-[700px] text-white/90">
                Real experiences from adventurers who discovered their perfect vibe
              </p>
            </AnimatedElement>
            <AnimatedElement variant="fadeUp" delay={0.2}>
              <InteractiveTestimonials />
            </AnimatedElement>
          </div>
        </AnimatedSection>

        {/* Subscribe Section */}
        <AnimatedSection id="subscribe" className="py-20" variant="fadeRight" delay={0.1}>
          <div className="container px-4">
            <AnimatedElement variant="scale" delay={0.2} className="max-w-3xl mx-auto bg-black/60 rounded-2xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <AnimatedElement variant="fadeLeft" delay={0.3} className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Join Vibe Travel Club</h2>
                  <p className="text-white/90 mb-6">
                    Subscribe to our newsletter for exclusive travel tips, guides, and special offers
                  </p>
                  <form className="space-y-4">
                    <AnimatedElement variant="fadeUp" delay={0.4}>
                      <Input
                        type="text"
                        placeholder="Your name"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 hover:border-teal-500/50 transition-colors"
                      />
                    </AnimatedElement>
                    <AnimatedElement variant="fadeUp" delay={0.5}>
                      <Input
                        type="email"
                        placeholder="Your email"
                        className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 hover:border-teal-500/50 transition-colors"
                      />
                    </AnimatedElement>
                    <AnimatedElement variant="bounce" delay={0.6}>
                      <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 transform hover:scale-105 transition-all">
                        Subscribe to Beehiiv Blog
                      </Button>
                    </AnimatedElement>
                  </form>
                  <AnimatedElement variant="fadeUp" delay={0.7}>
                    <p className="text-xs text-slate-400 mt-4">
                      By subscribing, you agree to our privacy policy and terms of service.
                    </p>
                  </AnimatedElement>
                </AnimatedElement>
                <AnimatedElement variant="fadeRight" delay={0.4} className="relative hidden md:block bg-black/70">
                  <div className="absolute inset-0 bg-black/70 z-10 rounded-r-2xl" />
                  <Image
                    src="/subscribe-image.jpg"
                    alt="Join our travel community"
                    fill
                    className="object-cover"
                    style={{ zIndex: 0 }}
                  />
                </AnimatedElement>
              </div>
            </AnimatedElement>
          </div>
        </AnimatedSection>

        {/* About Us Section */}
        <AnimatedSection id="about" className="py-20 bg-slate-800" variant="parallax" parallaxOffset={40}>
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <AnimatedElement variant="fadeDown" delay={0.1} className="flex flex-col items-center text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Meet Your Travel Curator</h2>
                <p className="text-slate-300 max-w-[700px]">
                  The story behind VibeTravel.club and why we&apos;re passionate about crafting your perfect journey
                </p>
              </AnimatedElement>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <AnimatedElement variant="fadeRight" delay={0.2} className="space-y-6">
                  <div className="relative w-full max-w-md mx-auto md:mx-0">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 p-1">
                      <div className="w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">TC</span>
                          </div>
                          <p className="text-slate-400 text-sm">Travel Curator</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
                
                <AnimatedElement variant="fadeLeft" delay={0.3} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Hi, I&apos;m Your Travel Expert</h3>
                    <div className="space-y-4 text-slate-300">
                      <p>
                        After 8+ years of traveling to over 40 countries and planning hundreds of trips, I realized something: 
                        the internet is full of generic travel advice, but what people really need is a <strong className="text-white">personalized roadmap</strong> 
                        to their perfect adventure.
                      </p>
                      <p>
                        I started VibeTravel.club because I believe every trip should reflect your unique interests, budget, and travel style. 
                        Whether you&apos;re seeking hidden speakeasies in Tokyo, the best sunset spots in Santorini, or family-friendly adventures in Costa Rica, 
                        I&apos;ve been there and I know exactly how to help you experience it authentically.
                      </p>
                      <p>
                        My approach is simple: <strong className="text-white">I don&apos;t just plan trips, I craft experiences</strong> that match your vibe. 
                        Every itinerary is researched, personally vetted, and designed to save you hours of planning while ensuring you discover 
                        the magic that makes each destination special.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 40, suffix: "+", label: "Countries Visited", delay: 0.2 },
                      { value: 500, suffix: "+", label: "Trips Planned", delay: 0.3 },
                      { value: 8, suffix: "+", label: "Years Experience", delay: 0.4 },
                      { value: 98, suffix: "%", label: "Happy Travelers", delay: 0.5 }
                    ].map((stat, index) => (
                      <AnimatedElement key={index} variant="bounce" delay={stat.delay} className="bg-black/40 rounded-lg p-4 text-center hover:bg-black/60 transition-colors group">
                        <div className="text-2xl font-bold text-teal-400 mb-1 group-hover:scale-110 transition-transform">
                          <AnimatedNumber 
                            value={stat.value} 
                            suffix={stat.suffix}
                            duration={1.5}
                            delay={stat.delay + 0.2}
                            className="text-2xl font-bold text-teal-400"
                          />
                        </div>
                        <div className="text-sm text-slate-300">{stat.label}</div>
                      </AnimatedElement>
                    ))}
                  </div>
                </AnimatedElement>
              </div>
              
              <AnimatedElement variant="scale" delay={0.5} className="mt-16 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-2xl p-8 border border-teal-500/20">
                <AnimatedElement variant="fadeUp" delay={0.6} className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">My Travel Philosophy</h3>
                  <p className="text-slate-300">What drives every itinerary I create</p>
                </AnimatedElement>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <MapPin className="h-8 w-8 text-teal-400" />,
                      title: "Authentic Experiences",
                      description: "Skip the tourist traps. I'll show you where locals actually go and what they actually do.",
                      delay: 0.7
                    },
                    {
                      icon: <Users className="h-8 w-8 text-teal-400" />,
                      title: "Personal Connection", 
                      description: "Every recommendation is based on your interests, not a one-size-fits-all template.",
                      delay: 0.8
                    },
                    {
                      icon: <Heart className="h-8 w-8 text-teal-400" />,
                      title: "Memorable Moments",
                      description: "I don't just plan trips—I create stories you'll tell for years to come.",
                      delay: 0.9
                    }
                  ].map((philosophy, index) => (
                    <AnimatedElement key={index} variant="fadeUp" delay={philosophy.delay} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-teal-500/20 rounded-full flex items-center justify-center hover:bg-teal-500/30 transition-colors">
                        <IconMotion variant="rotate" delay={philosophy.delay + 0.1}>
                          {philosophy.icon}
                        </IconMotion>
                      </div>
                      <h4 className="font-semibold text-white mb-2">{philosophy.title}</h4>
                      <p className="text-sm text-slate-300">
                        {philosophy.description}
                      </p>
                    </AnimatedElement>
                  ))}
                </div>
                
                <AnimatedElement variant="bounce" delay={1.0} className="mt-8 text-center flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="#contact" className="bg-teal-500 hover:bg-teal-600 px-8 py-3 text-lg font-semibold text-white rounded-md inline-block transition-colors transform hover:scale-105">
                    Let&apos;s Plan Your Perfect Trip
                  </Link>
                  <Link href="#subscribe" className="border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-8 py-3 text-lg font-semibold rounded-md inline-block transition-colors transform hover:scale-105">
                    Subscribe to Newsletter
                  </Link>
                </AnimatedElement>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Section */}
        <AnimatedSection id="contact" className="py-20 bg-slate-900 text-white" variant="parallax" parallaxOffset={60}>
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <AnimatedElement variant="fadeRight" delay={0.1} className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                  <p className="text-slate-300 mb-8">
                    Have questions about our guides or services? Want to collaborate? We&apos;d love to hear from you!
                  </p>
                </div>

                <div className="space-y-4">
                  <AnimatedElement variant="fadeLeft" delay={0.2} className="flex items-center gap-3 hover:bg-slate-800/30 p-3 rounded-lg transition-colors">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <IconMotion variant="pulse" delay={0.3}>
                        <Mail className="h-5 w-5 text-teal-400" />
                      </IconMotion>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Email us at</p>
                      <p className="font-medium">hello@vibetravel.club</p>
                    </div>
                  </AnimatedElement>
                  <AnimatedElement variant="fadeLeft" delay={0.3} className="flex items-center gap-3 hover:bg-slate-800/30 p-3 rounded-lg transition-colors">
                    <div className="bg-teal-500/20 p-2 rounded-full">
                      <IconMotion variant="pulse" delay={0.4}>
                        <Users className="h-5 w-5 text-teal-400" />
                      </IconMotion>
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">Follow us</p>
                      <div className="flex gap-4 mt-1">
                        {['Instagram', 'Twitter', 'TikTok'].map((platform, index) => (
                          <AnimatedElement key={platform} variant="fadeUp" delay={0.4 + (index * 0.05)}>
                            <a href="#" className="text-slate-300 hover:text-teal-400 transition-colors transform hover:scale-110 inline-block">
                              {platform}
                            </a>
                          </AnimatedElement>
                        ))}
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </AnimatedElement>

              <AnimatedElement variant="fadeLeft" delay={0.2}>
                <ContactForm />
              </AnimatedElement>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <IconMotion>
                  <PalmTree className="h-6 w-6 text-teal-500" />
                </IconMotion>
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
                  <Link href="#guides" className="hover:text-teal-400 transition-colors">
                    Travel Guides
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-teal-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-teal-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-teal-400 transition-colors">
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
