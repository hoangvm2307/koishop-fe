"use client";
import { useEffect, useState } from "react";
import FishCard from "./FishCard";
import { getKoiFishList, KoiFish } from "@/lib/api/koifishAPI";

export default function KoiFishList() {
  const [koiFishes, setKoiFishes] = useState<KoiFish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchKoiFishes = async () => {
      try {
        const data = await getKoiFishList();
        setKoiFishes(data);
        setLoading(false);
      } catch (err) {
        setError("Có lỗi xảy ra khi tải danh sách cá Koi");
        setLoading(false);
      }
    };

    fetchKoiFishes();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-4 gap-8 justify-items-center">
      {koiFishes.map((fish) => (
        <FishCard
          key={fish.id}
          name={fish.name}
          image={fish.image}
          price={fish.price}
          size={fish.size}
        />
      ))}
    </div>
  );
}
