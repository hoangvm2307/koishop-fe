"use client";

import { useQuery } from "@tanstack/react-query";
import { getRelatedKoiFish, KoiFish } from "@/lib/api/koifishApi";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import FishCard from "@/app/(user)/components/FishCard";

interface RelatedKoiFishProps {
  koiFishId: number;
}

export default function RelatedKoiFish({ koiFishId }: RelatedKoiFishProps) {
  const { data: relatedFish, isLoading } = useQuery<KoiFish[]>({
    queryKey: ["relatedKoiFish", koiFishId],
    queryFn: async () => {
      const response = await getRelatedKoiFish(koiFishId);
      console.log(response);

      return response;
    },
  });
  console.log(relatedFish);
  const options: EmblaOptionsType = {
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: true,
  };

  const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!relatedFish || relatedFish.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Related Koi Fish</h2>
      <Carousel opts={options} plugins={[plugin]} className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {relatedFish.map((fish) => (
            <CarouselItem
              key={fish.id}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <FishCard
                id={fish.id}
                name={fish.name}
                image={fish.imageUrl}
                price={fish.price}
                size={fish.size}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}