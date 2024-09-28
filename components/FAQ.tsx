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
    question: "How does Mymcha support independent artists?",
    answer:
      "Mymcha provides a platform for independent artists to showcase and sell their designs on high-quality apparel, reaching a global audience while retaining creative control and earning fair compensation for their work.",
  },
  {
    question: "Can I become an artist on Mymcha?",
    answer:
      "Yes! We welcome talented artists to join our community. Visit our 'Become an Artist' page to learn about our submission process and requirements.",
  },
  {
    question: "How is the quality of the apparel ensured?",
    answer:
      "We partner with premium apparel manufacturers to ensure high-quality, comfortable garments that do justice to our artists' designs. Each item undergoes quality checks before shipping.",
  },
  {
    question: "Are the designs limited edition?",
    answer:
      "Many of our designs are produced in limited quantities to maintain exclusivity. Check the product description for information on edition sizes.",
  },
  {
    question: "How do I care for my Mymcha apparel?",
    answer:
      "Care instructions vary by product. Generally, we recommend washing in cold water and hanging to dry to preserve the print quality. Specific care instructions are included with each item.",
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
