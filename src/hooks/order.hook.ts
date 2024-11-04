import { getOrderRevuenue, getUserOrders, Order } from "@/lib/api/orderApi";
import { useEffect, useState } from "react";


export const useGetUserOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getUserOrders(); 
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Expected an array but received: " + JSON.stringify(response));
        }
        const data = response.data.sort((a: Order, b: Order) => b.id - a.id);
        setOrders(data);
      } catch (error: any) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    return { orders, isLoading, error, fetchOrders };
  };

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