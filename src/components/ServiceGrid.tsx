import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

interface Service {
  id: number;
  name: string;
  icon: string;
  description: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Shimmer Loader Component
const ShimmerLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="bg-white p-6 rounded-lg shadow-md animate-pulse"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mb-4" />
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
      </div>
    ))}
  </div>
);

const ServiceGrid = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/popular/services`);
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data.data); // Assuming the API response has a `data` field
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An error occurred while fetching services");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-800">
          Our Services
        </h2>
        {isLoading ? (
          <ShimmerLoader />
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
                onClick={() => navigate(`/services/${service.id}`)} // Navigate on card click
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <img src={service.icon} alt={service.name} className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 ">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description.length > 80
                    ? `${service.description.slice(0, 80)}...`
                    : service.description}
                </p>
                <button
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  onClick={e => {
                    e.stopPropagation(); // Prevent card click when button is clicked
                    navigate(`/services/${service.id}`); // Navigate to service detail page
                  }}
                >
                  Book Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceGrid;