import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/services");
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await response.json();
        setServices(data.data); // Update state with the fetched services
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

  if (isLoading) {
    return (
      <div className="pt-16 bg-gray-50 flex justify-center items-center h-screen">
        <p>Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 bg-gray-50 flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Our Services
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We offer a comprehensive range of dental services to meet all your
          oral health needs. Our experienced team uses the latest technology to
          provide you with the best care possible.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 cursor-pointer"
              onClick={() => navigate(`/services/${service.id}`)}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <img
                  src={service.icon}
                  alt={service.name}
                  className="h-6 w-6"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description.length > 200
                  ? `${service.description.slice(0, 200)}...`
                  : service.description}
              </p>
              <button
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent div's onClick
                  navigate(`/services/${service.id}`); // Navigate to the service details page
                }}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
