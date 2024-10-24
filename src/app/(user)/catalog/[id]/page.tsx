"use client";

import { useQuery } from "@tanstack/react-query";
import { getKoiFishById, KoiFish } from "@/lib/api/koifishApi";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Calendar, Heart } from "lucide-react";

export default function KoifishDetails({ params }: { params: { id: string } }) {
  const {
    data: koiFish,
    isLoading,
    error,
  } = useQuery<KoiFish>({
    queryKey: ["koiFish", params.id],
    queryFn: () => getKoiFishById(params.id),
  });

  console.log(koiFish?.dailyFoodAmount);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Koi fish information</div>;
  if (!koiFish) return <div>Koi fish information not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <img src={koiFish.image} alt={koiFish.name} className="w-full h-auto rounded-lg" />
      </div>
      <div className="md:w-1/2 md:pl-8">
        <h1 className="text-3xl font-bold mb-4">{koiFish.name}</h1>
        <p className="text-gray-600 mb-2">SKU: {koiFish.id}</p>
        <p className="text-gray-600 mb-4">{koiFish.size}, IMPORTED KOI, SINGLE FISH</p>
        <p className="text-lg font-semibold mb-4">Exact Fish Pictured</p>
        <p className="text-2xl font-bold text-primary mb-6">${koiFish.price.toFixed(2)}</p>
        <p className="text-green-600 mb-4">In Stock</p>
        <Button className="w-full mb-6 flex items-center justify-center">
          <ShoppingCart className="mr-2" />
          ADD TO CART
        </Button>
        <div className="border-t border-b py-4 mb-6">
          <div className="flex items-center mb-2">
            <Truck className="mr-2" />
            <span className="font-semibold">OVERNIGHT DELIVERY</span>
          </div>
          <ul className="list-disc list-inside pl-6 text-sm">
            <li>Delivered straight to your door</li>
            <li>Fixed rate from $30 - $60</li>
            <li>Unlimited combined shipping</li>
          </ul>
        </div>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Calendar className="mr-2" />
            <span className="font-semibold">CHOOSE DELIVERY DATE</span>
          </div>
          <ul className="list-disc list-inside pl-6 text-sm">
            <li>Select delivery date at checkout</li>
            <li>Choose the date that best fits your schedule</li>
          </ul>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <Heart className="mr-2" />
            <span className="font-semibold">14-DAY WORRY-FREE GUARANTEE</span>
          </div>
          <p className="text-sm">
            We offer the industry's leading 14-day worry-free guarantee to ensure that you can shop with
            peace of mind, knowing that you'll always be protected.
          </p>
        </div>

        {/* Divider */}
        <hr className="my-6 border-t border-gray-300" />

        {/* Additional Information */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-semibold w-1/3">Origin:</td>
                <td className="py-2 w-2/3">{koiFish.origin}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Type:</td>
                <td className="py-2">{koiFish.type}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Personality:</td>
                <td className="py-2">{koiFish.personality}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Daily Food Amount:</td>
                <td className="py-2">{koiFish.dailyFoodAmount}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Breeder:</td>
                <td className="py-2">{koiFish.breeder}</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Gender:</td>
                <td className="py-2">{koiFish.gender}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
