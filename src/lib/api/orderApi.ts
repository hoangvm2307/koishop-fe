import api from "@/lib/axios";

interface OrderItemCreationDto {
  koiFishId: number;
}

interface OrderCreationDto {
  orderItemCreationDtos: OrderItemCreationDto[];
  isConsignment: boolean
}
export interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  userId: number;
  userName: string;
}
interface OrderFilterParams {
  PageNumber?: number;
  PageSize?: number;
  UserId?: number;
  Status?: string;
}
const defaultParams: OrderFilterParams = {
  PageNumber: 1,
  PageSize: 10,
  UserId: undefined,
  Status: undefined
};
export const createOrder = async (data: OrderCreationDto) => {
  const response = await api.post("/api/order", data);
  return response.data;
};

export const getUserOrders = async (params: OrderFilterParams = {}) => {
  const mergedParams = { ...defaultParams, ...params };
  const response = await api.get('/api/order/filter', { params: mergedParams });
  return response.data;
};

export const paymentSuccess = async (orderId: number) => {
  const response = await api.put(`/api/Order/order/${orderId}/payment-success`);
  return response.data;
};

export const getOrderRevuenue = async (year: number) => {
  const response = await api.get(`/api/Order/revenue/${year}`);
  return response.data;
};
