"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedElement from "@/components/AnimatedElement";

const faqs = [
  {
    question: "How does the personalized itinerary process work?",
    answer: "After you submit your preferences through our form, I personally review your interests, budget, and travel dates. Within 24 hours, you'll receive a detailed, day-by-day itinerary with restaurant recommendations, activities, local tips, and even backup options for rainy days. Each itinerary is completely unique and based on my personal experiences and local connections."
  },
  {
    question: "What's included in each travel package?",
    answer: "Every package includes a detailed PDF itinerary, interactive Google Maps with all locations marked, restaurant reservations guidance, local contact information, packing lists, cultural etiquette tips, and 7 days of email support during your trip. Premium packages also include WhatsApp support and live updates if needed."
  },
  {
    question: "How far in advance should I book?",
    answer: "I recommend booking at least 2-3 weeks before your travel date for the best recommendations and to secure reservations. However, I can accommodate last-minute requests (48+ hours notice) for an additional rush fee. Popular destinations during peak seasons should be booked even earlier."
  },
  {
    question: "Do you handle visa requirements and travel documents?",
    answer: "While I don't process visas directly, every itinerary includes a comprehensive travel requirements section with visa information, vaccination requirements, and important documents you'll need. I'll also flag any special entry requirements for your specific destination and nationality."
  },
  {
    question: "What if I need to make changes to my itinerary?",
    answer: "Minor adjustments are included! Once you receive your itinerary, you get one round of revisions at no extra cost. Additional changes are available for a small fee. During your trip, I'm available via email (or WhatsApp for premium packages) to help with any urgent modifications."
  },
  {
    question: "Are group trips and families accommodated?",
    answer: "Absolutely! I specialize in customizing itineraries for different group dynamics - whether it's a romantic getaway, family vacation with kids, friend groups, or solo adventures. Just specify your group composition in the form, and I'll tailor activities and accommodations accordingly."
  },
  {
    question: "What happens if my travel plans change?",
    answer: "If you need to cancel or postpone, you can transfer your itinerary credit to a new destination or future date within 12 months. Emergency cancellations due to illness or travel restrictions are handled case-by-case with maximum flexibility."
  },
  {
    question: "How do you ensure recommendations are current?",
    answer: "I personally visit or research every destination within the past 2 years, maintain relationships with local contacts worldwide, and continuously update recommendations based on recent traveler feedback. If a recommended place has closed or changed, I'll provide immediate alternatives."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}

function FAQItem({ question, answer, isOpen, onToggle, delay }: FAQItemProps) {
  return (
    <AnimatedElement variant="fadeUp" delay={delay}>
      <motion.div
        className="border border-slate-700 rounded-xl overflow-hidden bg-slate-800/30 backdrop-blur-sm"
        whileHover={{ borderColor: "rgba(20, 184, 166, 0.3)" }}
        transition={ { duration: 0.2 }}
      >
        <button
          onClick={onToggle}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
          aria-expanded={isOpen}
        >
          <h3 className="text-lg font-semibold text-white pr-4">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            {isOpen ? (
              <Minus className="h-5 w-5 text-teal-400" />
            ) : (
              <Plus className="h-5 w-5 text-teal-400" />
            )}
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 border-t border-slate-700/50">
                <motion.p
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-slate-300 leading-relaxed"
                >
                  {answer}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatedElement>
  );
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <AnimatedSection className="py-24 bg-gradient-to-b from-slate-900 to-slate-800" id="faq">
      <div className="container mx-auto px-4">
        <AnimatedElement variant="fadeUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Everything you need to know about planning your perfect trip with VibeTravel.club
          </p>
        </AnimatedElement>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
              delay={0.1 + (index * 0.05)}
            />
          ))}
        </div>

        <AnimatedElement variant="fadeUp" delay={0.6} className="text-center mt-12">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <motion.button
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
          >
            Contact Us Directly
          </motion.button>
        </AnimatedElement>
      </div>
    </AnimatedSection>
  );
} 