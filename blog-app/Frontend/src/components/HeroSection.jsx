import { Link } from "react-router-dom";
import {
  pageWrapper,
  primaryBtn,
  secondaryBtn,
} from "../styles/common";

function HeroSection() {
  return (
    <section className={`${pageWrapper} pt-24 pb-20`}>

      <div className="max-w-4xl">

        {/* Small Tag */}
        <p className="text-[#0066cc] text-sm font-semibold tracking-wide uppercase mb-4">
          Modern Publishing Platform
        </p>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-none text-[#1d1d1f] mb-8">
          Share your ideas with the world.
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-[#6e6e73] leading-relaxed max-w-2xl mb-10">
          Discover thoughtful articles, inspiring stories, and modern insights
          from creators around the globe.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <Link to="/register" className={primaryBtn}>
            Start Reading
          </Link>

          <Link
            to="/login"
            className={secondaryBtn}
          >
            Write a Blog
          </Link>

        </div>

      </div>

    </section>
  );
}

export default HeroSection;