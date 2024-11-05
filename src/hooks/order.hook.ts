import { getOrderRevuenue, getUserOrders, Order, updateOrderStatusApi } from "@/lib/api/orderApi";
import { getOrderItems } from "@/lib/api/orderItemApi";
import { OrderItem, OrderUpdateDto } from "@/models/order";
import { useCallback, useEffect, useState } from "react";


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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (year < 1900 || year > new Date().getFullYear()) {
        setError("Please provide a valid year.");
        return;
      }
  
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

  export const useUpdateOrderStatus = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
  
    const updateOrderStatus = async (data: OrderUpdateDto) => {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
  
      try {
        const response = await updateOrderStatusApi(data); // Call the API to update the order status
        setSuccess(true); // Set success to true if the API call is successful
        return response; // Optionally return the response if needed
      } catch (err: any) {
        setError(err.message || "An error occurred while updating the order status.");
      } finally {
        setIsLoading(false);
      }
    };
  
    return { isLoading, error, updateOrderStatus, success };
  };

  export const useGetOrderItems = (orderId: number) => {
    const [items, setItems] = useState<OrderItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchOrderItems = useCallback(async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await getOrderItems(orderId); // Call the API to fetch order items
        setItems(response); 
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching order items.");
      } finally {
        setIsLoading(false);
      }
    }, [orderId]); // Depend on orderId
  
    useEffect(() => {
      if (orderId) {
        fetchOrderItems(); 
      }
    }, [orderId, fetchOrderItems]); // Include fetchOrderItems in the dependency array
  
    return { items, isLoading, error, fetchOrderItems }; 
  };