import React, { useState, useEffect } from "react";
import BookingModal from "./BookingModal";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  experience: string;
}

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
        const response = await fetch(
          "http://127.0.0.1:8000/api/popular/doctors"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular doctors");
        }

        const data = await response.json();
        setDoctors(data.data); // Assuming the API response contains a "doctors" array
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

  if (isLoading) {
    return (
      <div className="text-center py-16 text-gray-500">
        Loading popular doctors...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">{error}</div>;
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Meet Our Popular Doctors
        </h2>
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
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
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
