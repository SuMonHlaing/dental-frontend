import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { Calendar, Clock, Phone, Mail, MapPin, Award } from "lucide-react";
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

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  doctors: Doctor[];
}

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
          `http://127.0.0.1:8000/api/services/${id}`
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

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Loading service details...
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

  if (!service) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Service not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="relative  h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920"
          alt={service.name}
          className="w-full h-full  object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
            {/* <p className="text-xl">{service.description}</p> */}
          </div>
        </div>
      </div>

      {/* Service Description */}
      <div className="max-w-7xl mx-auto px-4 py-16">
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
                    className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setIsBookingOpen(true);
                    }}
                  >
                    Book with {doctor.name.split(" ")[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        serviceName={service.name}
        doctorId={selectedDoctor?.id || 0}
        doctorName={selectedDoctor?.name}
      />
    </div>
  );
};

export default ServiceDetail;
