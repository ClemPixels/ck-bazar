import React from "react";
import { ProductCard } from "./ProductCard";

export const Products = ({ products }) => {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
          Shopping everyday
        </h1>
        <span className="w-20 h-[3px] bg-black"></span>
        <p className="max-w-[700px] text-gray-600 text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla rem id
          quos inventore est. Sunt modi quibusdam odit error corrupti doloremque
          velit vel beatae esse, exercitationem sequi sit, neque dolorem? Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
          blanditiis corrupti deleniti est ipsum laudantium quisquam eaque
          consequuntur velit culpa.
        </p>
      </div>
      <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
        {products.map((item) => (
          <ProductCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};
