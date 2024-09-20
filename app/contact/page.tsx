import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-6 text-gray-600">
            We'd love to hear from you. Whether you have a question about our
            products, artists, or anything else, our team is ready to answer all
            your questions.
          </p>

          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-3 text-gray-400" />
              <span>info@mymcha.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-3 text-gray-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-3 text-gray-400" />
              <span>123 Art Street, Creative City, 90210</span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
