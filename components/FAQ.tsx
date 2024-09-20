"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Why Mymcha?",
    answer:
      "Mymcha is an platform that connects independent artists with customers looking for unique, artist-designed apparel.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support via the contact form on our Contact page or by emailing us at info@mymcha.com.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and other secure payment methods.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for unworn items. Please refer to our Returns page for detailed information.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination.",
  },
];

const FAQAccordion = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">FAQs</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-200 rounded-lg overflow-hidden "
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <span className="text-lg font-semibold text-center">
                {faq.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 bg-rose-50">
              <p className="text-gray-700">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
