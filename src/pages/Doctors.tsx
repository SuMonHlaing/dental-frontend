import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Award, Calendar, Search } from "lucide-react";
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

const Doctors = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>();
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null);
  const [search, setSearch] = useState(""); // <-- Add search state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/doctors`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data.doctor);
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

  // Filter doctors by search
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="relative h-[500px] bg-gradient-to-r from-blue-600 to-blue-800">
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1920"
          alt="Doctors"
          className="w-full h-full object-cover"
        />
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

      {/* Search input */}
      <div className="max-w-7xl mx-auto px-4 mt-8 mb-4 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search doctors by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </span>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No doctors found.
            </div>
          )} 
          {filteredDoctors.map((doctor) => (
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
                  {/* View Profile Button */}
                  <button
                    onClick={() => navigate(`/doctors/${doctor.id}`)}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
                  >
                    View Profile
                  </button>

                  {/* Book Now Button */}
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor.name);
                      setSelectedDoctorId(doctor.id);
                      setIsBookingOpen(true);
                    }}
                    className="flex-1 px-4 py-2 rounded-md transition duration-200 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
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