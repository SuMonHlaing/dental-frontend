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
         {/* Hero Section */}
         <div className="relative h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920"
          alt="Our Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-center px-4 md:px-0">
              {[
                "We offer a comprehensive range of dental services to meet all your oral health needs.",
                "Our experienced team uses the latest technology to provide you with the best care possible.",
              ].map((line, lineIndex) => (
                <span key={lineIndex} className="block mb-2">
                  {Array.from(line).map((char, charIndex) => (
                    <span
                      key={charIndex}
                      style={{
                        animation: `fadeIn 0.05s ease-in-out ${(lineIndex * 100 + charIndex) * 0.05}s forwards`,
                        opacity: 0,
                      }}
                      className="inline-block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
              ))}
            </p>
            <style>
              {`
              @keyframes fadeIn {
                to {
                  opacity: 1;
                }
              }
              `}
            </style>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">

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
                {service.description.length > 80
                  ? `${service.description.slice(0, 80)}...`
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
