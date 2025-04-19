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

const AppointmentHistory: React.FC = () => {
  const { token } = useAuthStore(); // Get the user token from auth store
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/appointments/list",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the user token in the Authorization header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data.appointments); // Directly set the fetched appointments
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

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        Loading appointments...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No appointments found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="border rounded-lg p-4 hover:bg-gray-50 transition duration-150"
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
  );
};

export default AppointmentHistory;
