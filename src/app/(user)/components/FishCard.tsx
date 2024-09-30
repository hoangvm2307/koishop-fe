import React from "react";

interface FishCardProps {
  name: string;
  image: string;
  price: number;
}

export default function FishCard({ name, image, price }: FishCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden ">
      {/* Product Image */}
      <div className="relative p-4">
        <img
          src="https://d2e07cbkdk0gwy.cloudfront.net/wp-content/uploads/2024/09/2024.09.26_D_62_12-74.jpg"
          alt="Koi Fish"
          className=""
        />
        <span className="absolute top-2 right-2 text-white text-sm bg-black bg-opacity-60 px-2 py-1 rounded">
          koi fish
        </span>
      </div>

      {/* Product Details */}
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-xl font-bold text-red-600">${price.toFixed(2)}</p>

        {/* Add to Cart Button */}
        <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-md font-semibold py-3 px-8 rounded-full">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
