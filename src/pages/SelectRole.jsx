import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import image2 from "../assets/image2.jpg"; // Correct import

const SelectRole = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("role", role);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#2c5a84] flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-[#f2e7dc] rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row items-center border-4 border-black">
          {/* Image Section */}
          
            <img
              src={image2}
              alt="Illustration"
              className="rounded-xl w-full max-w-sm"
            />
          

          {/* Role Selection Section */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center items-center text-center">
            <h2 className="text-3xl font-bold text-[#1e2a3a] mb-6">Are you?</h2>
            <div className="flex gap-6">
              <button
                onClick={() => handleRoleSelect("student")}
                className="px-6 py-2 rounded-full border-2 border-[#1e2a3a] text-[#1e2a3a] font-medium hover:bg-[#1e2a3a] hover:text-white transition"
              >
                Student
              </button>
              <button
                onClick={() => handleRoleSelect("instructor")}
                className="px-6 py-2 rounded-full border-2 border-[#1e2a3a] text-[#1e2a3a] font-medium hover:bg-[#1e2a3a] hover:text-white transition"
              >
                Instructor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;


