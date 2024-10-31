"use client";
import React, { useEffect, useState } from "react";
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
import { getCartItems, updateCart } from "@/lib/cartUtils";

export default function CartPage() {
  // States for cart management and options
  const [cartItems, setCartItems] = React.useState<KoiFish[]>([]);
  const [couponCode, setCouponCode] = React.useState("");
  const [isConsignment, setIsConsignment] = useState(false);
  const [consignmentDuration, setConsignmentDuration] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const router = useRouter();

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = 0;
  const total = subtotal + tax;

  // Fetch cart items from localStorage
  const { data: koiFishData, isLoading } = useQuery({
    queryKey: ["cartKoiFish"],
    queryFn: async () => {
      const cartItemIds = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cartItemIds.length === 0) return [];
      return await getKoiFishByIds(cartItemIds);
    },
  });

  // Update cart items state when data is fetched
  useEffect(() => {
    if (koiFishData) {
      setCartItems(koiFishData);
    }
  }, [koiFishData]);

  // Create order mutation
  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: async (data) => {
      // Clear cart after successful order
      localStorage.removeItem("cart");
      const orderId = data.id.toString();

      toast.success("Order created successfully");

      try {
        // Create VNPAY payment link
        const paymentData = await createPaymentLink({ orderId, amount: 10000 });
        console.log(paymentData);

        // Redirect to payment or confirmation page
        if (paymentData.paymentUrl) {
          window.location.href = paymentData.paymentUrl;
        } else {
          router.push(`/order-confirmation/${orderId}`);
        }
      } catch (error) {
        console.error("Failed to create payment link:", error);
        toast.error("Failed to create payment link. Please try again.");
      }
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

  // Handle checkout process
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
      isConsignment,
    });
  };

  const handleCheckboxChange = (fishId: string, checked: boolean) => {
    setSelectedItems((prev) => {
      if (checked) {
        return [...prev, fishId];
      } else {
        return prev.filter((id) => id !== fishId);
      }
    });
  };
 
  const handleRemoveProducts = () => {
    if (selectedItems.length === 0) {
      toast.warning("Vui lòng chọn sản phẩm cần xóa");
      return;
    }

    // Lấy giỏ hàng hiện tại từ localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Lọc bỏ các sản phẩm đã chọn
    const updatedCart = currentCart.filter((id: string) => !selectedItems.includes(id));

    // Cập nhật localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Cập nhật state
    setCartItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));

    // Reset danh sách đã chọn
    setSelectedItems([]);
 
    const newCart = currentCart.filter((id: string) => !selectedItems.includes(id));
    updateCart(newCart);
    
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
                <TableHead className="text-right">CONSIGNMENT</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <Checkbox
                        id={`check-${item.id}`}
                        className="mr-4"
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                      />
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="mr-4"
                      />
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
              <div className="border-t pt-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="consignment"
                    checked={isConsignment}
                    onCheckedChange={(checked) => setIsConsignment(checked as boolean)}
                  />
                  <label htmlFor="consignment">Consign entire order</label>
                </div>
                {isConsignment && (
                  <div>
                    <label htmlFor="consignmentDuration" className="block mb-1">
                      Consignment duration (months):
                    </label>
                    <Input
                      id="consignmentDuration"
                      type="number"
                      value={consignmentDuration}
                      onChange={(e) => setConsignmentDuration(Number(e.target.value))}
                      min={1}
                    />
                  </div>
                )}
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
