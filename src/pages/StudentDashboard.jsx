import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaInstagram, FaGithub, FaTwitter, FaYoutube } from "react-icons/fa";
import HeroImage from "../assets/image5.jpg";
import { ReactTyped } from "react-typed";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const data = {
  ai: {
    title: "AI / ML",
    desc: "Explore AI & Machine Learning. Train neural networks, build smart apps using deep learning, NLP, CV, and more.",
  },
  ds: {
    title: "Data Science",
    desc: "Master data wrangling, visualization, statistics, modeling with Python, Pandas, NumPy, and more.",
  },
  cyber: {
    title: "Cybersecurity",
    desc: "Ethical hacking, digital forensics, penetration testing, security hardening and more.",
  },
  web: {
    title: "Web Development",
    desc: "Build fullstack apps using HTML, CSS, JS, React, Node.js, Express and modern APIs.",
  },
  cloud: {
    title: "Cloud Computing",
    desc: "Deploy apps with AWS, Azure, GCP. Learn CI/CD, Docker, and DevOps best practices.",
  },
  mobile: {
    title: "Mobile Development",
    desc: "Create Android and iOS apps using Flutter, React Native, and native SDKs.",
  },
};

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
      <Navbar />

      {/* 🖼 Hero Section */}
      <section className="relative h-[80vh]">
        <img src={HeroImage} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-white">
            Welcome,&nbsp;
            <ReactTyped
              strings={["Future Innovator!", "AI Enthusiast!", "Web Developer!", "Cyber Hero!"]}
              typeSpeed={50}
              backSpeed={30}
              loop
            />
          </h1>
          <p className="text-base sm:text-lg mb-6 text-white">Learn Web Dev, AI, Cybersecurity and more</p>
          <a href="#courses" className="bg-white text-slate-900 px-6 py-2 font-bold rounded-full hover:scale-105 transition">
            Explore Courses
          </a>
        </div>
      </section>

      {/* 📚 Specializations Section */}
      <section id="specializations" className="py-16 px-4 bg-blue-50 dark:bg-slate-800">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Explore Specializations</h2>
          <p className="max-w-xl mx-auto text-gray-600 dark:text-gray-300">
            Choose a focus area and dive into expert-designed learning paths.
          </p>
        </div>
        <Swiper
          spaceBetween={20}
          autoplay={{ delay: 2500 }}
          modules={[Autoplay]}
          loop={true}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {Object.keys(data).map((key) => (
            <SwiperSlide key={key}>
              <div
                onClick={() => navigate(`/specialization/${key}`)}
                className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow transition cursor-pointer hover:ring-2 hover:ring-blue-400 hover:scale-[1.03]"
              >
                <img
                  src={`https://media.istockphoto.com/id/1420039900/photo/cyber-security-ransomware-email-phishing-encrypted-technology-digital-information-protected.jpg?s=2048x2048&w=is&k=20&c=H2DW0WcG6v9JZow-0XW31UVcCV63q41zpJk-d8kmIY0=${key}`}
                  alt={key}
                  className="mb-4 rounded w-full h-40 object-cover"
                />
                <h3 className="text-lg font-semibold mb-2">{data[key].title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{data[key].desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center mt-8">
          <a href="/specializations" className="text-indigo-600 font-medium hover:underline">
            View All Specializations
          </a>
        </div>
      </section>

      {/* 📘 Courses Section */}
      <section id="courses" className="py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10">Top Courses</h2>
        <Swiper
          spaceBetween={20}
          autoplay={{ delay: 2500 }}
          modules={[Autoplay]}
          loop={true}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {["GameDev", "Linux+", "Networks", "Blockchain", "Ethical Hacking", "DevOps"].map((title) => (
            <SwiperSlide key={title}>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow transition hover:ring hover:ring-indigo-400 hover:scale-[1.03]">
                <img
                  src={`https://source.unsplash.com/300x200/?${title}`}
                  alt={title}
                  className="mb-4 rounded w-full h-40 object-cover"
                />
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Learn about {title} with hands-on examples & modern tools.
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center mt-8">
          <a href="/courses" className="text-indigo-600 font-medium hover:underline">
            View All Courses
          </a>
        </div>
      </section>

      {/* 📝 Blog Section */}
      <section className="py-16 px-4 bg-blue-50 dark:bg-slate-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Instructor's Blog</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {["AI", "Cyber", "Linux", "Web"].map((blog) => (
            <div
              key={blog}
              className="bg-white dark:bg-slate-700 p-6 w-72 rounded-xl shadow transition hover:ring hover:ring-pink-400 hover:scale-[1.03]"
            >
              <img
                src={`https://source.unsplash.com/300x200/?${blog}`}
                alt={blog}
                className="mb-4 rounded w-full h-40 object-cover"
              />
              <h4 className="font-semibold mb-2">{blog} Insights</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Read about trends and updates in {blog}.
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/blogs" className="text-indigo-600 font-medium hover:underline">
            View All Blogs
          </a>
        </div>
      </section>

      {/* 📣 Call to Action Section */}
      <section className="py-20 text-center bg-gradient-to-r from-blue-300 to-indigo-400 text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Start Your Learning Journey with Edusource
        </h2>
        <a
          href="/login"
          className="mt-4 inline-block bg-white text-slate-900 px-6 py-2 rounded-full font-semibold hover:scale-105"
        >
          Sign Up
        </a>
      </section>

      {/* 👨‍🏫 About Section */}
      <section className="py-20 px-6 text-center bg-white dark:bg-slate-900">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">About Edusource</h2>
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Edusource is dedicated to bringing quality tech education. Whether you're learning AI, Web Dev, or Security — we help you grow.
        </p>
      </section>

      {/* 🔗 Footer */}
      <footer className="bg-slate-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Edusource</h3>
            <p className="text-sm">&copy; 2025 Edusource. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-xl mb-4 md:mb-0">
            <a href="#" className="text-pink-500 hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="text-gray-300 hover:text-white"><FaGithub /></a>
            <a href="#" className="text-blue-400 hover:text-blue-300"><FaTwitter /></a>
            <a href="#" className="text-red-600 hover:text-red-500"><FaYoutube /></a>
          </div>
          <div className="flex flex-col md:flex-row gap-4 text-sm text-center md:text-left">
            <a href="/" className="hover:underline">Home</a>
            <a href="#courses" className="hover:underline">Courses</a>
            <a href="#specializations" className="hover:underline">Specializations</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;