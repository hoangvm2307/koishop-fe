import React from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FishCardProps {
  name: string;
  image: string;
  price: number;
  size: string;
}

export default function FishCard({ name, image, price, size }: FishCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden w-64 ">
      {/* Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="text-sm font-bold text-gray-500 mb-1">{size}</div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-xl font-bold text-primary mb-4">${price.toFixed(2)}</p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button className="flex items-center justify-center   text-white text-sm font-semibold py-2 px-4 rounded">
            <ShoppingCart className="w-4 h-4 mr-2" />
            ADD TO CART
          </Button>
          <button className="flex items-center justify-center border border-gray-300 hover:border-primary text-gray-600 hover:text-primary text-sm font-semibold p-2 rounded">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
