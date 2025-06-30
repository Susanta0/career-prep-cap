import React from "react";

const ListProduct = ({ image, title, price, category }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="relative overflow-hidden bg-gray-100">
        <img className="h-64 w-full" src={image} alt={title} />
        <div className="absolute bg-black"></div>
      </div>
      <div className="p-5">
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-3">{title}</h2>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
