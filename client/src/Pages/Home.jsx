import React from "react";
import HeroBanner from "../Components/HeroBanner";
import WeOffer from "../Components/WeOffer";
import AboutUs from "../Components/AboutUs";
import Testimonial from "../Components/Testimonial";
import WelcomeGym from "../Components/WelcomeGym";
import PricingPlan from "../Components/PricingPlan";
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
