import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  decreamentQuantity,
  deleteItem,
  increamentQuantity,
  resetCart,
} from "../redux/bazarSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

const CartItem = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const isLoggedIn = useSelector((state) => state.bazar.isLoggedIn);
  const productData = useSelector((state) =>
    isLoggedIn && userInfo
      ? state.bazar.userCarts[userInfo.uid] || [] // Logged-in user's cart
      : state.bazar.tempCart || []
  );
  return (
    <div className="w-2/3 pr-10">
      <div className="w-full">
        <h2 className="font-titleFont text-2xl">Shooping Cart</h2>
      </div>
      <div>
        {productData.length > 0 ? (
          productData.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-6 mt-6"
            >
              <div className="flex items-center gap-2">
                <MdOutlineClose
                  onClick={() => {
                    dispatch(deleteItem(item._id));
                    toast.error(`${item.title} is removed`);
                  }}
                  className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
                />
                <img
                  src={item.image}
                  alt="productImage"
                  className="w-32 h-32 object-cover object-center rounded-sm"
                />
              </div>
              <h2 className="w-52">${item.title}</h2>
              <p className="w-10">${item.price}</p>
              <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
                <p className="text-sm">Quantity</p>
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <button
                    onClick={() =>
                      dispatch(
                        decreamentQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.price,
                          quantity: item.quantity,
                          description: item.description,
                        })
                      )
                    }
                    className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        increamentQuantity({
                          _id: item._id,
                          title: item.title,
                          image: item.image,
                          price: item.price,
                          quantity: item.quantity,
                          description: item.description,
                        })
                      )
                    }
                    className="border h-5 font-normal text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white cursor-pointer duration-300 active:bg-black"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="w-14">${item.quantity * item.price}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      <button
        onClick={() => {
          dispatch(resetCart());
          toast.error("Your cart is empty");
        }}
        className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800 duration-300"
      >
        Reset Cart
      </button>
      <Link to="/">
        <button className="mt-8 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300">
          <span>
            <HiOutlineArrowLeft />
          </span>
          go shopping
        </button>
      </Link>
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

export default CartItem;
