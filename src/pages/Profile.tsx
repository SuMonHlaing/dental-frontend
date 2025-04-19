import React from 'react';
import { User, Calendar, Mail, Phone } from 'lucide-react';
import useAuthStore from '../store/authStore';
import AppointmentHistory from '../components/AppointmentHistory';

const Profile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">Please login to view your profile</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <div className="mt-4 w-full space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="h-5 w-5" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="h-5 w-5" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment History */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">Your Appointments</h2>
              </div>
              <AppointmentHistory doctorId={0} /> {/* Pass 0 to show all appointments */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;