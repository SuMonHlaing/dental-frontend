import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Clock, Award, Phone, Mail, MapPin } from "lucide-react";
import BookingModal from "../components/BookingModal";

interface Doctor {
  id: number;
  name: string;
  image: string;
  experience: string;
  phone: string;
  email: string;
  location: string;
  working_hours: string;
  certifications: string;
  about: string;
}

const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/doctors/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctor details");
        }

        const data = await response.json();
        setDoctor(data.data); // Set the fetched doctor details
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(
            err.message || "An error occurred while fetching doctor details"
          );
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Loading doctor details...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-red-500">
            {error}
          </h1>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Doctor not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {doctor.name}
              </h1>
              <p className="text-xl text-blue-100 mb-2">{doctor.experience}</p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition duration-200"
              >
                Book Appointment
              </button>
            </div>
            <div className="hidden md:block">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-80 h-80 object-cover rounded-full border-4 border-white shadow-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{doctor.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{doctor.email}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{doctor.location}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="text-gray-600">{doctor.working_hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Certifications Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Certifications</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">{doctor.certifications}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        doctorName={doctor.name}
        doctorId={doctor.id}
      />
    </div>
  );
};

export default DoctorDetail;
