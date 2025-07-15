import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const useAutoLogout = (timeout = 15 * 60 * 1000) => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await signOut(auth);
        localStorage.clear();
        alert("You have been logged out due to inactivity.");
        navigate("/login");
      }, timeout);
    };

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];

    for (const event of events) {
      window.addEventListener(event, resetTimer);
    }

    resetTimer(); // Initial timer

    return () => {
      for (const event of events) {
        window.removeEventListener(event, resetTimer);
      }
      clearTimeout(timer);
    };
  }, [navigate, timeout]);
};

export default useAutoLogout;
