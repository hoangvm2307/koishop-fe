"use client";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Badge } from "../ui/badge";
import { getCartItems } from "@/lib/cartUtils";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [username, setUsername] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUsername(userData.userName);
    }

    const updateCartCount = () => {
      const cartItems = getCartItems();
      setCartItemCount(cartItems.length);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="bg-primary">
        <div className="mx-auto px-8 py-1 flex justify-between items-center">
          <div className="text-white">
            <span className="mr-2 text-sm">800-351-6851</span>|
            <a href="#" className="text-sm ml-2 hover:underline transition duration-300">
              Contact Customer Service
            </a>
          </div>
          <div className="flex items-center ">
            {username ? (
              <Link href="/profile">
                <Button variant="ghost" className="text-white hover:bg-primary hover:text-neutral-400">
                  {username}
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="default" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <Link href="/cart">
              <Button variant="default" size="icon" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-0 -right-1 px-1 py-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <nav className="bg-white shadow-md">
        <div className="mx-auto px-8">
          <div className="flex justify-between items-center py-2">
            <Link href="/" className="text-2xl font-bold italic">
              <span className="text-red-600">KOI</span>
              <span className="text-teal-900">GARDEN</span>
            </Link>
            <div className="flex gap-6">
              {[
                "SHOP ALL",
                "KOI FISH FOR SALE",
                "GOLDFISH FOR SALE",
                "POND PACKS",
                "GIFT CARDS",
                "DISCOUNTS",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 text-base font-bold hover:text-teal-900 relative group transition duration-300"
                >
                  {item}
                  <span className=" absolute left-0 right-0 bottom-0 h-0.5 bg-teal-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
