import React from "react";
import HeroSection from "./HeroSection";
import FeaturedArticles from "./FeaturedArticles";

function Home() {
  return (
    <div>
      <h1 className="text-center">Welcome to Blog App</h1>
  <HeroSection />
  < FeaturedArticles/>
    </div>
  );
}
export default Home;