"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart, Eye, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getCartItems, isInCart, updateCart } from "@/lib/cartUtils";

interface FishCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
}

export default function FishCard({ id, name, image, price, size }: FishCardProps) {
  const router = useRouter();
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(isInCart(Number(id)));

    const handleCartUpdate = () => {
      setInCart(isInCart(Number(id)));
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [id]);

  const handleAddToCart = () => {
    const currentCart = getCartItems();
    const newCart = [...currentCart, Number(id)];
    updateCart(newCart);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden w-64 ">
      {/* Product Image */}
      <Link href={`/catalog/${id}`} className="relative block">
        <img src={image} alt={name} className="w-full h-64 object-contain cursor-pointer" />
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <div className="text-sm font-bold text-gray-500 mb-1">{size}</div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-xl font-bold text-primary mb-4">${price.toFixed(2)}</p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleAddToCart}
            disabled={inCart}
            variant={inCart ? "secondary" : "default"}
            className="flex items-center justify-center text-sm font-semibold py-2 px-4 rounded"
          >
            {inCart ? (
              <>
                <CheckIcon className="mr-2 h-4 w-4" />
                ADDED
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2" />
                ADD TO CART
              </>
            )}
          </Button>
          <button className="flex items-center justify-center border border-gray-300 hover:border-primary text-gray-600 hover:text-primary text-sm font-semibold p-2 rounded">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
