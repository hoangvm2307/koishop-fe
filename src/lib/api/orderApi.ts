import api from "@/lib/axios";
import { OrderUpdateDto } from "@/models/order";

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
  SortBy?: string;
  IsDescending?: boolean;
}
const defaultParams: OrderFilterParams = {
  PageNumber: 1,
  PageSize: 10,
  UserId: undefined,
  Status: undefined,
  SortBy: "OrderDate",
  IsDescending: true
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

export const updateOrderStatusApi = async (data: OrderUpdateDto) => {
  const response = await api.patch(`/api/Order/order/status`, data);
  return response.data;
};


