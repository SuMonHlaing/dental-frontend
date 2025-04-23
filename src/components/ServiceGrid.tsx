import React, { useState, useEffect } from 'react';

interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
}

const ServiceGrid = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/popular/services");
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

  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50 flex justify-center items-center">
        <p>Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50 flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
                <img src={service.icon} alt={service.title} className="h-6 w-6 text-blue-600" /> {/* Assuming the API provides an icon URL */}
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-4">
                {service.description.length > 200
                  ? `${service.description.slice(0, 200)}...`
                  : service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceGrid;