import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import authImage from "../assets/image7 copy.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEmailAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePhoneLogin = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier("recaptcha", {
        size: "invisible",
        callback: () => {}
      }, auth);

      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${mobile}`,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmation;
      setShowOtpInput(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await window.confirmationResult.confirm(otp);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col">
      <Navbar />

      <div className="relative flex-1 w-full">
        <img
          src={authImage}
          alt="Signup Lady"
          className="w-full h-[100vh] object-cover object-center"
        />

        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-sm p-6 md:p-12 border-2 border-black rounded-xl bg-white shadow-2xl transition duration-500">
            <h2 className="text-3xl font-bold mb-4 text-center text-slate-900">
              {isLogin ? "Login" : "Sign Up"} to Edusource
            </h2>

            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mb-3 px-4 py-2 border rounded"
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full mb-3 px-4 py-2 border rounded"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded"
            />

            <button
              onClick={handleEmailAuth}
              className="w-full bg-slate-900 text-white py-2 rounded-full font-bold hover:bg-blue-700 transition"
            >
              {isLogin ? "Login with Email" : "Sign Up with Email"}
            </button>

            <p className="my-4 text-center font-semibold">OR</p>

            {/* Phone Auth */}
            <input
              type="text"
              placeholder="Mobile Number (10 digits)"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded"
            />

            {showOtpInput ? (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full mb-3 px-4 py-2 border rounded"
                />
                <button
                  onClick={verifyOtp}
                  className="w-full bg-green-600 text-white py-2 rounded-full font-bold hover:bg-green-700 transition"
                >
                  Verify OTP
                </button>
              </>
            ) : (
              <button
                onClick={handlePhoneLogin}
                className="w-full bg-orange-500 text-white py-2 rounded-full font-bold hover:bg-orange-600 transition"
              >
                Send OTP
              </button>
            )}

            <div id="recaptcha"></div>

            {/* Google Sign-in */}
            <button
              onClick={handleGoogleLogin}
              className="w-full mt-3 bg-red-500 text-white py-2 rounded-full font-bold hover:bg-red-600 transition"
            >
              Sign in with Google
            </button>

            <p
              className="mt-4 text-center text-blue-600 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
