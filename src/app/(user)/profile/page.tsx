"use client";

import { useState, useEffect } from "react";
import { getUserOrders, Order, paymentSuccess } from "@/lib/api/orderApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPaymentLink } from "@/lib/api/vnpayApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getKoiFishList, KoiFish } from "@/lib/api/koifishApi";
import KoiFishTable from "./components/KoifishTable";
import RecentOrdersTable from "./components/RecentOrdersTable";
import Cookies from "js-cookie";
import { Consignment, getConsignmentByUserId } from "@/lib/api/consignmentApi";
import ConsignmentTable from "./components/ConsignmentTable";

export default function ProfilePage() {
  const router = useRouter();
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const [activeTab, setActiveTab] = useState<"orders" | "koiFishes" | "consignments">("orders");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const [koiFishes, setKoiFishes] = useState<KoiFish[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [consignments, setConsignments] = useState<Consignment[]>([]);

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
        const result = await getUserOrders({ PageNumber: 1, PageSize: 10, UserId: userData.id });
        setOrders(result.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab]);

  useEffect(() => {
    const fetchKoiFishes = async () => {
      try {
        const result = await getKoiFishList({ userId: userData.id });
        setKoiFishes(result.items);
      } catch (error) {
        console.error("Error fetching koi fishes:", error);
      }
    };

    if (activeTab === "koiFishes") {
      fetchKoiFishes();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchConsignments = async () => {
      try {
        const result = await getConsignmentByUserId(userData.id);
        setConsignments(result);
      } catch (error) {
        console.error("Error fetching consignments:", error);
      }
    };

    if (activeTab === "consignments") {
      fetchConsignments();
    }
  }, [activeTab]);

  const refreshConsignments = async () => {
    try {
      const result = await getConsignmentByUserId(userData.id);
      setConsignments(result);
    } catch (error) {
      console.error("Error refreshing consignments:", error);
    }
  };

  const handleLogout = () => {
    // Xóa user từ localStorage
    localStorage.removeItem("user");

    // Xóa tất cả cookies liên quan
    Cookies.remove("token");
    window.dispatchEvent(new Event("userLogout"));
    // Chuyển hướng về trang home
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="lg:w-1/4 h-fit shadow-sm">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl">My Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100 transition-colors"
              onClick={() => setActiveTab("orders")}
            >
              <span className="mr-2">📦</span> My Orders
            </Button>
            <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 transition-colors">
              <span className="mr-2">⭐</span> My Reviews
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100 transition-colors"
              onClick={() => setActiveTab("koiFishes")}
            >
              <span className="mr-2">🐟</span> My Koi Fishes
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100 transition-colors"
              onClick={() => setActiveTab("consignments")}
            >
              <span className="mr-2">📋</span> My Consignments
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              onClick={handleLogout}
            >
              <span className="mr-2">🚪</span> Logout
            </Button>
          </CardContent>
        </Card>
        <div className="lg:w-3/4">
          <Card className="shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl">
                {activeTab === "orders" ? "Recent Orders" : "My Koi Fishes"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {activeTab === "orders" ? (
                <RecentOrdersTable orders={orders} loading={loading} />
              ) : activeTab === "koiFishes" ? (
                <KoiFishTable koiFishes={koiFishes} loading={loading} />
              ) : (
                <ConsignmentTable consignments={consignments} loading={loading} onUpdate={refreshConsignments} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
