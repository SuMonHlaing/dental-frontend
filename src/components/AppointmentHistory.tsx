import React, { useState, useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import useAuthStore from "../store/authStore"; // Import auth store to get the token

interface Appointment {
  id: number;
  doctor: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  notes: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Shimmer Loader Component
const ShimmerLoader = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="border rounded-lg p-4 animate-pulse bg-white"
      >
        <div className="flex items-center space-x-4 mb-3">
          <div className="h-5 w-20 bg-gray-200 rounded" />
          <div className="h-5 w-16 bg-gray-200 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>
    ))}
  </div>
);

const AppointmentHistory: React.FC = () => {
  const { token } = useAuthStore(); // Get the user token from auth store
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/appointments/list`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data.appointments);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  return (
    <div className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        Appointment History
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
      ) : appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No appointments found
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition duration-150 bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">{appointment.preferred_date}</span>
                  <Clock className="h-5 w-5 text-blue-500 ml-2" />
                  <span>{appointment.preferred_time}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-800 font-medium">{appointment.full_name}</p>
                <p className="text-gray-600">{appointment.email}</p>
                <p className="text-gray-600">{appointment.phone}</p>
                <p className="text-gray-600 font-medium">
                  Doctor: {appointment.doctor}
                </p>
                {appointment.notes && (
                  <p className="text-gray-500 text-sm">{appointment.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
