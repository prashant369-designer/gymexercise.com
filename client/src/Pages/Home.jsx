import React from "react";
import HeroBanner from "../Components/HeroBanner";
import WeOffer from "../components/WeOffer";
import AboutUs from "../components/AboutUs";
import Testimonial from "../components/Testimonial";
import WelcomeGym from "../components/WelcomeGym";
import PricingPlan from "../components/PricingPlan";
import Blog from "../Components/OurBlog";
import Footer from "../CommonComponents/Footer";

function Home() {
  return (
    <>
      <HeroBanner />
      <WeOffer />
      <AboutUs />
      <Testimonial />
      <WelcomeGym />
      <PricingPlan />
      <Blog />
      <Footer />
    </>
  );
}

export default Home;
