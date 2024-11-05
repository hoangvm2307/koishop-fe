import api from "@/lib/axios";

export const getOrderItems = async (orderId: number) => {
    const response = await api.get(`/api/OrderItem/order/${orderId}`);
    return response.data;
  };
  