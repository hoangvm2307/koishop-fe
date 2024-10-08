import { Button } from "@/components/ui/button";
import { User, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-primary">
        <div className="mx-auto px-8 flex justify-between items-center">
          <div className="text-white">
            <span className="mr-2 text-sm">800-351-6851</span>|
            <a href="#" className="text-sm ml-2 hover:underline transition duration-300">
              Contact Customer Service
            </a>
          </div>
          <div className="flex items-center ">
            <Link href="/login">
              <Button variant="default" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="default" size="icon">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <nav className="bg-white shadow-md">
        <div className="mx-auto px-8">
          <div className="flex justify-between items-center py-2">
            <div className="text-xl font-bold italic">
              <span className="text-red-600">KOI</span>
              <span className="text-teal-900">GARDEN</span>
            </div>
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
                  className="text-gray-700 text-sm font-bold hover:text-teal-900 relative group transition duration-300"
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
