"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKoiFishById, KoiFish } from "@/lib/api/koifishApi";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Truck, Calendar, Heart, Star, CheckIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { postRating } from "@/lib/api/ratingApi";
import { getCartItems, updateCart, isInCart } from "@/lib/cartUtils";
import RelatedKoiFish from "./components/RelatedKoifish";

export default function KoifishDetails({ params }: { params: { id: string } }) {
  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;
  const {
    data: koiFish,
    isLoading,
    error,
  } = useQuery<KoiFish>({
    queryKey: ["koiFish", params.id],
    queryFn: () => getKoiFishById(params.id),
  });
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    setInCart(isInCart(Number(params.id)));

    const handleCartUpdate = () => {
      setInCart(isInCart(Number(params.id)));
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [params.id]);

  const ratingMutation = useMutation({
    mutationFn: postRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["koiFish", params.id] });
      toast.success("Rating submitted successfully");
      setRating(0);
      setComment("");
    },
    onError: (error) => {
      toast.error("Error submitting rating");
    },
  });
  const handleAddToCart = () => {
    if (!inCart) {
      const currentCart = getCartItems();
      const newCart = [...currentCart, Number(params.id)];
      updateCart(newCart);
      toast.success("Added to cart successfully");
    }
  };
  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    ratingMutation.mutate({
      ratingValue: rating,
      comment,
      userId: userObj.id,
      koiFishId: Number(params.id),
    });
  };
  console.log(koiFish?.ratings);
  const [newComment, setNewComment] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Koi fish information</div>;
  if (!koiFish) return <div>Koi fish information not found</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="container mx-auto py-8 flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="relative w-full aspect-square max-w-screen-lg mx-auto">
            <Image
              src={koiFish.imageUrl}
              alt={koiFish.name}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{koiFish.name}</h1>
          <p className="text-gray-600 mb-2">SKU: {koiFish.id}</p>
          <p className="text-gray-600 mb-4">{koiFish.size}, IMPORTED KOI, SINGLE FISH</p>
          <p className="text-lg font-semibold mb-4">Exact Fish Pictured</p>
          <p className="text-2xl font-bold text-primary mb-6">${koiFish.price.toFixed(2)}</p>
          <p className="text-green-600 mb-4">In Stock</p>
          <Button
            onClick={handleAddToCart}
            disabled={inCart}
            variant={inCart ? "secondary" : "default"}
            className="w-full mb-6 flex items-center justify-center"
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
              We offer the industry's leading 14-day worry-free guarantee to ensure that you can shop
              with peace of mind, knowing that you'll always be protected.
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
                  <td className="py-2">{koiFish.breed.breedName}</td>
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

      {/* Related Koi Fishes */}
      <RelatedKoiFish koiFishId={Number(params.id)} />

      {/* Rating Section */}
      <div className="mt-12 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Rate this Koi Fish</h2>
        <form onSubmit={handleRatingSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${
                  star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comment..."
            className="w-full p-2 border rounded-md"
          />
          <Button type="submit" disabled={ratingMutation.isPending}>
            {ratingMutation.isPending ? "Submitting..." : "Submit Rating"}
          </Button>
        </form>
      </div>

      {/* Comments Section */}
      <hr className="my-6 border-t border-gray-300" />
      <div className="mt-12 mb-12">
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>
        <div className="space-y-6">
          {koiFish.ratings?.map((rating) => (
            <div key={rating.id} className="flex space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{rating.userName ? rating.userName.charAt(0) : "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{rating.userName}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(rating.dateCreated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= rating.ratingValue ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-gray-700">{rating.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
