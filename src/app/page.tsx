import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/landing/Stats";
import FeaturedTool from "@/components/landing/FeaturedTool";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedTool />
    </>
  );
}