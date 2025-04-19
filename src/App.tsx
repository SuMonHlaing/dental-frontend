import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import useAuthStore from './store/authStore';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/profile" /> : <Login />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/profile" /> : <Register />}
            />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;