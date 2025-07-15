import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // ✅ import from your firebase.js

import Home from "./pages/Home";
import SelectRole from "./pages/SelectRole";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import SpecializationDetail from "./pages/SpecializationDetail";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-20 text-lg font-bold">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={user ? <StudentDashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="/specialization/:id" element={<SpecializationDetail />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
