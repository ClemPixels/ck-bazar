import React from "react";
import { IoMdCart } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { removeUser, resetCart } from "../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";
import { store } from "../redux/store";

const Header = () => {
  const productData = useSelector((state) =>
    state.bazar.isLoggedIn && state.bazar.userInfo
      ? state.bazar.userCarts[state.bazar.userInfo.uid] || []
      : state.bazar.tempCart
  );

  const userInfo = useSelector((state) => state.bazar.userInfo);
  console.log(userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userCart = JSON.stringify(
        store.getState().bazar.userCarts[user.uid]
      ); // Save cart data from Redux
      localStorage.setItem(`cart_${user.uid}`, userCart); // Persist cart for future login
    }

    signOut(auth)
      .then(() => {
        toast.success("Log out Successful");
        dispatch(removeUser());
        dispatch(resetCart());
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 font-titleFont shadow-md sticky top-0 z-40">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center justify-center h-full">
            <h3 title="Home" className="text-3xl font-bold">
              CK Bazzar
            </h3>
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center h-full space-x-4">
            <Link to="/">
              <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                Home
              </li>
            </Link>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Pages
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Shop
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Element
            </li>
            <li className="text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
              Blog
            </li>
          </ul>
          <Link to="/cart">
            <div className="relative text-3xl text-black cursor-pointer hover:text-orange-900 duration-300">
              <IoMdCart />
              <span className="absolute w-6 h-6 -left-2 top-3 text-sm text-white bg-red-400 rounded-full flex items-center justify-center font-semibold font-titleFont">
                {productData?.length || 0}
              </span>
            </div>
          </Link>
          <div className="relative group cursor-pointer">
            <img
              className="w-8 h-8 rounded-full"
              src={
                userInfo
                  ? userInfo.image
                  : "https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              alt="userlogo"
            />

            <div className="absolute top-full mt-2 w-32 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 ease-in-out">
              <ul className="flex flex-col text-center">
                {!userInfo ? (
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    Login
                  </Link>
                ) : (
                  <li
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  >
                    Sign out
                  </li>
                )}
              </ul>
            </div>
          </div>

          {userInfo && (
            <p className="text-base font-titleFont font-semibold">
              {userInfo.name}
            </p>
          )}
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

export default Header;
