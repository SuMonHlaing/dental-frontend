import React, { useState, useEffect } from "react";
import BookingModal from "./BookingModal";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  experience: string;
  appointments_count: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Shimmer Loader Component
const ShimmerLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
      >
        <div className="w-full h-64 bg-gray-200" />
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-10 bg-gray-200 rounded w-full mt-4" />
        </div>
      </div>
    ))}
  </div>
);

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/popular/doctors`);
        if (!response.ok) {
          throw new Error("Failed to fetch popular doctors");
        }
        const data = await response.json();
        setDoctors(data.doctor); // <-- updated to 'doctor'
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred while fetching doctors");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Meet Our Popular Doctors
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
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
                  <p className="text-blue-600 mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600">{doctor.experience}</p>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor.name);
                      setSelectedDoctorId(doctor.id);
                      setIsBookingOpen(true);
                    }}
                    className="mt-4 w-full px-4 py-2 rounded-md transition duration-200 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        doctorName={selectedDoctor}
        doctorId={selectedDoctorId ?? 0}
      />
    </div>
  );
};

export default DoctorList;