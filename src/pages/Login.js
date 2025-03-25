import React from "react";
import { githubLogo, googleLogo } from "../assets";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser, loadUserCart } from "../redux/bazarSlice";
import { useNavigate } from "react-router-dom";
// import { Button } from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          addUser({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );

        const storedCart =
          JSON.parse(localStorage.getItem(`cart_${user.uid}`)) || [];
        dispatch(loadUserCart({ userCart: storedCart, userId: user.uid }));

        toast.success("Login Successful");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login failed. Please try again");
      });
  };

  //   const handleSignOut = () => {
  //     signOut(auth)
  //       .then(() => {
  //         dispatch(removeUser());
  //         toast.success("Log out Successful");
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
      <div>
        <div>
          <h2 className="text-center mb-4 text-3xl font-semibold">Login</h2>
          <p>Login with google or github to continue</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-10">
        <div
          onClick={handleGoogleLogin}
          className="text-base w-60 h-12 -tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
        >
          <img className="w-16" src={googleLogo} alt="googleLogo" />
          <span className="text-sm text-gray-900">Sign in with Google</span>
        </div>
        {/* <Button action={handleSignOut}>Sign out</Button> */}
      </div>
      <div className="w-full flex items-center justify-center gap-10">
        <div className="text-base w-60 h-12 -tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300">
          <img className="w-10" src={githubLogo} alt="googleLogo" />
          <span className="text-sm text-gray-900">Sign in with Github</span>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnclick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
