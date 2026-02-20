import HeroSection from "../components/HeroSection";
import PopularCourses from "../components/PopularCourses";
import ImpactSection from "../components/ImpactSection";
import TechStackSection from "../components/TechStackSection";
import Testimonials from "../components/Testimonials";
import LearningFeatures from "../components/LearningFeatures";
import ContactSection from "../components/ContactSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <PopularCourses />
      <ImpactSection />
      <TechStackSection />
      <Testimonials />
      <LearningFeatures />
      <ContactSection />
    </>
  );
};

export default Home;
