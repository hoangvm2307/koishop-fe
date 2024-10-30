"use client";

import { useState, useEffect } from "react";
import { getUserOrders, Order, paymentSuccess } from "@/lib/api/orderApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPaymentLink } from "@/lib/api/vnpayApi";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import ImageUploader from "../components/ImageUploader";

export default function ProfilePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const getPaymentLinkMutation = useMutation({
    mutationFn: getPaymentLink,
    onSuccess: async (data) => {
      const orderId = searchParams.get("vnp_OrderInfo");
      if (orderId) {
        try {
          const result = await paymentSuccess(parseInt(orderId));
          toast.success("Payment has been successfully confirmed!");
          // Update UI or perform other actions here
        } catch (error) {
          toast.error("An error occurred while confirming the payment. Please try again later.");
        }
      } else {
        toast.error("Order information not found. Please contact support.");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while processing the payment. Please try again later.");
    },
  });
  useEffect(() => {
    if (searchParams.get("vnp_Amount")) {
      const queryParams = {
        vnp_Amount: searchParams.get("vnp_Amount") || "",
        vnp_BankCode: searchParams.get("vnp_BankCode") || "",
        vnp_BankTranNo: searchParams.get("vnp_BankTranNo") || "",
        vnp_CardType: searchParams.get("vnp_CardType") || "",
        vnp_OrderInfo: searchParams.get("vnp_OrderInfo") || "",
        vnp_PayDate: searchParams.get("vnp_PayDate") || "",
        vnp_ResponseCode: searchParams.get("vnp_ResponseCode") || "",
        vnp_TmnCode: searchParams.get("vnp_TmnCode") || "",
        vnp_TransactionNo: searchParams.get("vnp_TransactionNo") || "",
        vnp_TransactionStatus: searchParams.get("vnp_TransactionStatus") || "",
        vnp_TxnRef: searchParams.get("vnp_TxnRef") || "",
        vnp_SecureHash: searchParams.get("vnp_SecureHash") || "",
      };
      getPaymentLinkMutation.mutate(queryParams);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getUserOrders({ PageNumber: 1, PageSize: 10, UserId: 1 });
        setOrders(result.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      

      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="lg:w-1/4 h-fit shadow-sm">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl">My Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 transition-colors">
              <span className="mr-2">📦</span> My Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 transition-colors">
              <span className="mr-2">⭐</span> My Reviews
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 transition-colors">
              <span className="mr-2">🐟</span> My Koi Fishes
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <span className="mr-2">🚪</span> Logout
            </Button>
          </CardContent>
        </Card>
        <div className="lg:w-3/4">
          <Card className="shadow-sm  ">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>User Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{new Date(order.orderDate).toLocaleDateString("vi-VN")}</TableCell>
                        <TableCell>{order.totalAmount.toLocaleString("vi-VN")} ₫</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{order.userName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
