import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen pt-16">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 mb-24 text-center">
          We&apos;re here to help! Whether you have questions about our products
          or need assistance, feel free to reach out.
        </p>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-neutral-50 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Contact
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Mail className="mr-3 text-indigo-600" size={20} />
                <span>info@mymcha.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-indigo-600" size={20} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-3 text-indigo-600" size={20} />
                <span>123 Art Street, Thamel, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-3 text-indigo-600" size={20} />
                <span>Mon-Fri: 9AM - 5PM (NPT)</span>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-neutral-50 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-8 text-gray-800">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
            Find Us Here
          </h2>
          <p className="text-center text-gray-600 mb-4"></p>
          <div className="relative h-[400px] mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/map.jpg"
              alt="MYMCHA Location Map"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text-center text-gray-600 text-lg">
            123 Art Street, Thamel, Kathmandu, Nepal
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
