import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">DentalCare</h3>
            <p className="text-sm md:text-base text-gray-400">
              Providing quality dental care with a gentle touch. Your smile is our priority.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-sm md:text-base">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-sm md:text-base">info@dentalcare.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-sm md:text-base">123 Dental Street, City, State</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Opening Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <div className="text-sm md:text-base">
                  <p>Monday - Friday: 9am - 6pm</p>
                  <p>Saturday: 9am - 2pm</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-blue-400 transition duration-200">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm md:text-base text-gray-400">&copy; {new Date().getFullYear()} DentalCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;