"use client";
import { useQuery } from "@tanstack/react-query";
import FishCard from "./FishCard";
import { getKoiFishList, KoiFish } from "@/lib/api/koifishAPI";

export default function KoiFishList() {
  const {
    data: koiFishes,
    isLoading,
    error,
  } = useQuery<KoiFish[], Error>({
    queryKey: ["koiFishes"],
    queryFn: getKoiFishList,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading: {error.message}</div>;

  return (
    <div className="grid grid-cols-4 gap-8 justify-items-center">
      {koiFishes?.map((fish) => (
        <FishCard
          key={fish.id}
          id={fish.id}
          name={fish.name}
          image={"https://d2e07cbkdk0gwy.cloudfront.net/wp-content/uploads/2024/10/2024.10.10_G_090_13-23.jpg"}
          price={fish.price}
          size={fish.size}
        />
      ))}
    </div>
  );
}
