import React, { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";
import useAuthStore from "../store/authStore"; // Import auth store to get the token

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  doctorId: number; // 👈 doctorId is already defined here
  doctorName?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  serviceName,
  doctorName,
  doctorId, // 👈 Access doctorId here
}) => {
  const { token } = useAuthStore(); // Get the user token from auth store
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!token) {
      alert("You must be logged in to book an appointment.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferred_date: formData.date,
          preferred_time: formData.time,
          notes: formData.notes,
          doctor_id: doctorId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book appointment");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        notes: "",
      });
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Error submitting appointment:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Book Appointment
          {serviceName && (
            <span className="block text-base md:text-lg text-blue-600 mt-1">
              {serviceName}
            </span>
          )}
          {doctorName && (
            <span className="block text-sm md:text-base text-gray-600 mt-1">
              with {doctorName}
            </span>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  id="date"
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Preferred Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  id="time"
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>

          {submitStatus === "success" && (
            <div className="text-green-600 text-sm">
              Appointment booked successfully!
            </div>
          )}

          {submitStatus === "error" && (
            <div className="text-red-600 text-sm">
              Failed to book appointment. Please try again.
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
