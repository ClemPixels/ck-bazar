import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loader from "./LoadingScreen";
const Redirect = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.bazar.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      toast.info(
        "You're already logged in! Redirecting to the home page in a bit"
      );
      setTimeout(() => {
        navigate("/");
      }, 7000);
    }
  }, [isLoggedIn, navigate]);
  if (isLoggedIn) {
    return <Loader />;
  }
  return children; // Render login/signup page
};

export default Redirect;
