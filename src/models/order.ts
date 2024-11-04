export interface OrderItem {
    id: number;
    price: number;
    orderId: number;
    koiFishId: number;
    koiFishName: string;
  }
  
export interface Order {
    id: number;
    orderDate: string;
    totalAmount: number;
    status: string;
    userId: number;
    userName: string;
    // orderItems: OrderItem[];
}