import React from 'react';
import { Shield, Award, Users, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">About DentalCare</h1>
            <p className="text-xl">Your Trusted Partner in Dental Health</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Story</h2>
          <div className="max-w-3xl mx-auto text-gray-600 space-y-4">
            <p>
              Founded in 2010, DentalCare has been at the forefront of providing exceptional dental care
              to our community. Our journey began with a simple mission: to make quality dental care
              accessible to everyone while ensuring the highest standards of patient comfort and satisfaction.
            </p>
            <p>
              Over the years, we have grown from a small practice to a comprehensive dental care center,
              equipped with state-of-the-art technology and staffed by a team of highly skilled professionals.
              Our commitment to excellence and patient-centered care has earned us the trust of thousands
              of patients and numerous accolades in the dental healthcare sector.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Expert Care</h3>
              <p className="text-gray-600">
                Our team of experienced dentists ensures you receive the highest quality care
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Latest Technology</h3>
              <p className="text-gray-600">
                State-of-the-art equipment and modern techniques for better treatment
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Patient-Focused</h3>
              <p className="text-gray-600">
                Personalized care tailored to your unique dental needs
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Heart className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Comfortable Experience</h3>
              <p className="text-gray-600">
                Relaxing environment and gentle treatment approach
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from patient care to customer service.
                Our commitment to continuous learning and improvement ensures that we stay at the
                forefront of dental healthcare.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Integrity</h3>
              <p className="text-gray-600">
                We maintain the highest standards of professional ethics and transparency in our
                practice. You can trust us to always act in your best interest and provide honest
                recommendations for your dental care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Compassion</h3>
              <p className="text-gray-600">
                We understand that visiting the dentist can be stressful for many people. Our team
                is committed to providing gentle, empathetic care that puts you at ease.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Innovation</h3>
              <p className="text-gray-600">
                We embrace the latest advancements in dental technology and techniques to provide
                you with the most effective and comfortable treatment options available.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;