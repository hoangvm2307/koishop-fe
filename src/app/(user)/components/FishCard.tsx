import React from "react";
import { ShoppingCart, Eye } from "lucide-react";

interface FishCardProps {
  name: string;
  image: string;
  price: number;
}

export default function FishCard({ name, image, price }: FishCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden w-64 shadow-md">
      {/* Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
          5.5"
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-xl font-bold text-primary mb-4">${price.toFixed(2)}</p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white text-sm font-semibold py-2 px-4 rounded">
            <ShoppingCart className="w-4 h-4 mr-2" />
            ADD TO CART
          </button>
          <button className="flex items-center justify-center border border-gray-300 hover:border-primary text-gray-600 hover:text-primary text-sm font-semibold p-2 rounded">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
