"use client";
import { useQuery } from "@tanstack/react-query";
import FishCard from "./FishCard";
import { getKoiFishList, KoiFish, FilterData } from "@/lib/api/koifishApi";

interface KoiFishListProps {
  filters: Partial<FilterData>;
}

export default function KoiFishList({ filters }: KoiFishListProps) {
  const {
    data: koiFishes,
    isLoading,
    error,
  } = useQuery<KoiFish[], Error>({
    queryKey: ["koiFishes", filters],
    queryFn: () => getKoiFishList(filters),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
      {koiFishes?.map((fish) => (
        <FishCard
          key={fish.id}
          id={fish.id}
          name={fish.name}
          image={fish.image}
          price={fish.price}
          size={fish.size}
        />
      ))}
    </div>
  );
}