"use client";
import { Button } from "@/components/ui/button";
import { User, ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Badge } from "../ui/badge";
import { getCartItems } from "@/lib/cartUtils";
import Footer from "./Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [username, setUsername] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUsername(userData.userName);
    }
    const handleLogout = () => {
      setUsername(null);
    };

    window.addEventListener("userLogout", handleLogout);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    const updateCartCount = () => {
      const cartItems = getCartItems();
      setCartItemCount(cartItems.length);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("userLogout", handleLogout);
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <div
        className={`bg-primary transition-all duration-300 ${isScrolled ? "h-0 overflow-hidden" : ""}`}
      >
        <div className="mx-auto px-4 sm:px-8 py-2 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-white">
            <span className="mr-2 text-sm">800-351-6851</span>|
            <a href="#" className="text-sm ml-2 hover:underline transition duration-300">
              Contact Customer Service
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-2">
            <div className="flex justify-between items-center w-full sm:w-auto">
              <Link href="/" className="text-2xl font-bold italic">
                <span className="text-red-600">KOI</span>
                <span className="text-teal-900">GARDEN</span>
              </Link>
              <button
                className="sm:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <div className={`flex-col sm:flex-row gap-6 ${menuOpen ? 'flex' : 'hidden'} sm:flex w-full sm:w-auto items-center`}>
              {/* Menu items */}
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                {[
                  "SHOP ALL",
                  "KOI FISH FOR SALE",
                  "GOLDFISH FOR SALE",
                  "GIFT CARDS",
                  "SELL YOUR KOI",
                ].map((item) => (
                  <Link
                    key={item}
                    href={item === "SELL YOUR KOI" ? "/consignment" : "#"}
                    className="text-gray-700 text-base font-bold hover:text-teal-900 relative group transition duration-300"
                  >
                    {item}
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-teal-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                ))}
              </div>

              {/* User và Cart buttons */}
              <div className="flex items-center gap-2">
                {username ? (
                  <Link href="/profile">
                    <Button variant="ghost" className="text-primary">
                      {username}
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button variant="ghost" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Link href="/cart">
                  <Button variant="ghost" size="icon" className="relative">
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
        </div>
      </nav>
      {children}
      <Footer />
    </div>
  );
}