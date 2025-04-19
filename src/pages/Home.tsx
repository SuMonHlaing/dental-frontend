import React from "react";
import HeroSlider from "../components/HeroSlider";
import ServiceGrid from "../components/ServiceGrid";
import DoctorList from "../components/DoctorList";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <ServiceGrid />
      <DoctorList />
    </div>
  );
};

export default Home;
