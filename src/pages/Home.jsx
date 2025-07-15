import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaGithub,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import bgImage from "../assets/image1.jpg"; // Ensure correct path

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />

      {/* Hero Section (static background) */}
      <section
        className="flex-1 bg-cover bg-center flex items-center px-6 py-12"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-2xl text-left  backdrop-blur-sm p-8  ">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Start Your Learning Journey
          </h2>
          <p className="text-lg mb-6 text-slate-700">
            Boost your skills in AI/ML, Cybersecurity, Web Dev, and more with Edusource.
          </p>
          <Link
            to="/select-role"
            className="bg-slate-900 text-white font-bold px-8 py-3 rounded-full shadow hover:bg-blue-700 hover:scale-105 transition-transform duration-300 inline-block"
          >
            LET’S GO
          </Link>
        </div>
      </section>

      {/* Footer with brand-colored icons */}
      <footer className="bg-slate-900 text-white py-6 flex justify-center gap-8">
        <BrandIcon
          href="#"
          icon={<FaInstagram />}
          hoverColor="#E4405F" // Instagram pink-red
        />
        <BrandIcon
          href="#"
          icon={<FaGithub />}
          hoverColor="#6e5494" // GitHub purple
        />
        <BrandIcon
          href="#"
          icon={<FaTwitter />}
          hoverColor="#1DA1F2" // Twitter blue
        />
        <BrandIcon
          href="#"
          icon={<FaYoutube />}
          hoverColor="#FF0000" // YouTube red
        />
      </footer>
    </div>
  );
};

// Social icon component with brand color on hover
const BrandIcon = ({ href, icon, hoverColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-xl transition duration-300"
      style={{
        transition: "color 0.3s ease-in-out",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.color = hoverColor;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.color = "white";
      }}
    >
      {icon}
    </a>
  );
};

export default Home;
