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
  appointments_count: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Shimmer Loader Component
const ShimmerLoader = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-3" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
        </div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
        </div>
      </div>
    </div>
  </div>
);

const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/doctors/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctor details");
        }
        const data = await response.json();
        setDoctor(data.data);
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

  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Section - always visible */}
      <div className="relative h-[400px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {doctor?.name || (isLoading ? "Loading..." : "Doctor Details")}
              </h1>
              <p className="text-xl text-blue-100 mb-2">
                {doctor?.experience || (isLoading ? " " : "")}
              </p>
              {!isLoading && doctor && (
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-6 py-3 rounded-md transition duration-200 bg-white text-blue-600 hover:bg-blue-50"
                >
                  Book Appointment
                </button>
              )}
            </div>
            <div className="hidden md:block">
              {doctor?.image && !isLoading ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-80 h-80 object-cover rounded-full border-4 border-white shadow-lg mx-auto"
                />
              ) : (
                <div className="w-80 h-80 bg-gray-200 rounded-full mx-auto animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <ShimmerLoader />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16">
          <img
            src="https://www.svgrepo.com/show/327388/error.svg"
            alt="No connection"
            className="w-40 h-40 mb-6 opacity-70"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Unable to connect to the server
          </h2>
          <p className="text-gray-500 mb-4">
            Please check your internet connection or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      ) : !doctor ? (
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Doctor not found
            </h1>
          </div>
        </div>
      ) : (
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
      )}

      {/* Booking Modal */}
      {doctor && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          doctorName={doctor.name}
          doctorId={doctor.id}
        />
      )}
    </div>
  );
};

export default DoctorDetail;
