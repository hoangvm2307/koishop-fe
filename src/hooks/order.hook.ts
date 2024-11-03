import { getOrderRevuenue } from "@/lib/api/orderApi";
import { useEffect, useState } from "react";

export const useGetOrderRevenue = (year: number) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!year) return;

    const fetchRevenue = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getOrderRevuenue(year);
        setData(response);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching revenue.");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, [year]);

  return { data, loading, error };
};