"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrder } from "@/lib/api/orderApi";
import axios from "axios";
import { toast } from "react-toastify";
import { createPaymentLink } from "@/lib/api/vnpayApi";
import { getKoiFishByIds, KoiFish } from "@/lib/api/koifishApi";

export default function CartPage() {
  const [cartItems, setCartItems] = React.useState<KoiFish[]>([]);

  const [couponCode, setCouponCode] = React.useState("");
  const router = useRouter();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = 0;
  const total = subtotal + tax;

  const { data: koiFishData, isLoading } = useQuery({
    queryKey: ["cartKoiFish"],
    queryFn: async () => {
      const cartItemIds = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cartItemIds.length === 0) return [];
      return await getKoiFishByIds(cartItemIds);
    },
  });


  useEffect(() => {
    if (koiFishData) {
      setCartItems(koiFishData);
    }
  }, [koiFishData]);

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async (data) => {
      localStorage.removeItem("cart");
      const orderId = data.id.toString();

      toast.success("Order created successfully");

      try {
        const paymentData = await createPaymentLink({ orderId, amount: 10000 });
        console.log(paymentData);

        if (paymentData.paymentUrl) {
          window.location.href = paymentData.paymentUrl;
        } else {
          // if paymentUrl is null, redirect to order confirmation page
          router.push(`/order-confirmation/${orderId}`);
        }
      } catch (error) {
        console.error("Failed to create payment link:", error);
        toast.error("Failed to create payment link. Please try again.");
        // router.push(`/order-confirmation/${orderId}`);
      }
      // router.push("/order-confirmation");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("Failed to order:", error.response?.data?.message);
      } else {
        console.error("Error:", error);
      }
      toast.error("Failed to order. Please try again.");
    },
  });
  const handleCheckout = async () => {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");

    // Create orderItemCreationDtos array
    const orderItemCreationDtos = cartItems.map((koiFishId: string) => ({
      koiFishId: parseInt(koiFishId),
    }));
    console.log(orderItemCreationDtos);
    // Call API to create order
    orderMutation.mutate({
      orderItemCreationDtos,
    });
  };
  const handleRemoveProducts = () => {
    // Handle removing selected products
  };

  const handleApplyCoupon = () => {
    // Handle applying coupon code
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">CART</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <Button onClick={handleRemoveProducts} variant="secondary" className="mb-4">
            Remove Products
          </Button>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">PRODUCTS (CHECK THEN UPDATE CART TO REMOVE)</TableHead>
                <TableHead className="text-right">SIZE</TableHead>
                <TableHead className="text-right">TOTAL</TableHead>
                <TableHead className="text-right">PRICE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Checkbox id={`check-${item.id}`} className="mr-4" />
                      <Image src={item.image} alt={item.name} width={80} height={80} className="mr-4" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">Warranty: </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{item.size}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {item.price && (
                      <span className="line-through text-gray-500 mr-2">${item.price.toFixed(2)}</span>
                    )}
                    <span className="font-bold text-red-500">${item.price.toFixed(2)}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button variant="secondary" className="mt-4">
            Share Cart with Customer Service
          </Button>
        </div>

        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-teal-800">CART TOTAL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label htmlFor="coupon" className="block mb-2">
                  COUPON CODE:
                </label>
                <div className="flex">
                  <Input
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="rounded-r-none"
                    placeholder="Enter code"
                  />
                  <Button onClick={handleApplyCoupon} className="rounded-l-none bg-teal-800 text-white">
                    APPLY
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <Button variant="outline" size="sm">
                    CALCULATE SHIPPING
                  </Button>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>TOTAL:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white"
                disabled={orderMutation.isPending}
              >
                {orderMutation.isPending ? "Đang xử lý..." : "PROCEED TO CHECKOUT"}
              </Button>
              {orderMutation.isError && <p className="text-red-500 text-sm mt-2">Error when ordering</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}