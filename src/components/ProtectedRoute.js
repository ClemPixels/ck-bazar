import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./LoadingScreen";

const ProtectedRoute = ({ children, message }) => {
  const isLoggedIn = useSelector((state) => state.bazar.isLoggedIn);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Display the toast notification
      toast.info(message || "You need to log in to access this page.", {
        autoClose: 7000,
      });
      setIsRedirecting(true); // Trigger redirect state

      // Redirect after the toast displays
      setTimeout(() => {
        navigate("/login");
      }, 5000); // Adjust delay to match toast duration
    }
  }, [isLoggedIn, message, navigate]);

  // Prevent rendering the children or the protected content while redirecting
  if (isRedirecting || !isLoggedIn) {
    return <div>{<Loader />}</div>;
  }

  return (
    <>
      {children}
      <ToastContainer
        position="top-left"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnclick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default ProtectedRoute;
