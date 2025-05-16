import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookingModal from "../components/BookingModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  doctors: Doctor[];
}

const ShimmerLoader = () => (
  <div className="bg-white rounded-lg shadow-lg p-8 mb-12 animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-2/5 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
  </div>
);

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/services/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch service details");
        }

        const data = await response.json();
        setService(data.data); // Set the fetched service details
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(
            err.message || "An error occurred while fetching service details"
          );
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Section - always visible */}
      <div className="relative h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920"
          alt={service?.name || "Service"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              {service?.name || "Service Details"}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {isLoading ? (
          <>
            <ShimmerLoader />
            <div className="text-center text-gray-400 mt-4 text-lg">
              Loading service details...
            </div>
          </>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
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
        ) : !service ? (
          <div className="text-center text-gray-800 text-2xl font-bold">
            Service not found
          </div>
        ) : (
          <>
            {/* Service Description */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                About this Service
              </h2>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>

            {/* Doctors Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Our Specialists
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {service.doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-200"
                  >
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 mb-2">{doctor.experience}</p>
                      <p className="text-gray-600">{doctor.location}</p>
                      <button
                        className="mt-4 w-full px-4 py-2 rounded-md transition duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setIsBookingOpen(true);
                        }}
                      >
                        {`Book with ${doctor.name.split(" ")[0]}`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceName={service?.name}
        doctorId={selectedDoctor?.id || 0}
        doctorName={selectedDoctor?.name}
      />
    </div>
  );
};

export default ServiceDetail;
