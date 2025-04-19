import React from 'react';
import { Bluetooth as Tooth, Smile, Camera, Syringe, Microscope, Heart } from 'lucide-react';

const services = [
  {
    id: 1,
    icon: Tooth,
    title: "General Dentistry",
    description: "Comprehensive dental care including cleanings, fillings, and preventive treatments"
  },
  {
    id: 2,
    icon: Smile,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with whitening, veneers, and other aesthetic procedures"
  },
  {
    id: 3,
    icon: Camera,
    title: "Digital X-Rays",
    description: "Advanced imaging for accurate diagnosis and treatment planning"
  },
  {
    id: 4,
    icon: Syringe,
    title: "Root Canal",
    description: "Expert endodontic treatment to save damaged teeth"
  },
  {
    id: 5,
    icon: Microscope,
    title: "Dental Implants",
    description: "Permanent solution for missing teeth with natural-looking results"
  },
  {
    id: 6,
    icon: Heart,
    title: "Pediatric Dentistry",
    description: "Gentle and friendly dental care for children"
  }
];

const ServiceGrid = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <service.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-sm md:text-base text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;