import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Award, Calendar } from "lucide-react";
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

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/doctors");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data.data); // Update state with the fetched doctor list
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An error occurred while fetching doctors");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-16 bg-gray-50 flex justify-center items-center h-screen">
        <p>Loading doctors...</p>
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
      <div className="relative h-[300px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Our Expert Doctors</h1>
            <p className="text-xl">
              Meet our team of experienced dental professionals
            </p>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div
                className="relative h-64 cursor-pointer"
                onClick={() => navigate(`/doctors/${doctor.id}`)}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-xl font-semibold text-white">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-100">{doctor.certifications}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{doctor.experience}</span>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Award className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{doctor.certifications}</span>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">{doctor.working_hours}</span>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => navigate(`/doctors/${doctor.id}`)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
                  >
                    View Profile
                  </button>
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
            </div>
          ))}
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        doctorId={selectedDoctorId ?? 0}
        onClose={() => setIsBookingOpen(false)}
        doctorName={selectedDoctor}
      />
    </div>
  );
};

export default Doctors;
