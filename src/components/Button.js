import React from "react";

export const Button = ({ action, children }) => {
  return (
    <div>
      <button
        onClick={action}
        className="bg-black text-white text-base py-3 px-8 -tracking-wide rounded-md hover:bg-gray-800 duration-300"
      >
        {children}
      </button>
    </div>
  );
};
