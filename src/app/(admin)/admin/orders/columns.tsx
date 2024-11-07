import React, { useState } from "react"; // Ensure React and useState are imported
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";
import { useToast } from "@/hooks/use-toast";
import { Order, OrderUpdateDto } from "@/models/order";
import { useUpdateOrderStatus } from "@/hooks/order.hook"; // Import the update status hook
import OrderItemsModal from "./order-items-modal";

// Define the order statuses with colors
const orderStatuses = [
  // { value: "Pending", label: "Pending", color: "bg-yellow-500" },
  // { value: "Processing", label: "Processing", color: "bg-blue-500" },
  // { value: "Delivering", label: "Delivering", color: "bg-orange-500" },
  // { value: "Delivered", label: "Delivered", color: "bg-green-500" },
  { value: "Cancelled", label: "Cancelled", color: "bg-red-500" },
  // { value: "Holding", label: "Holding", color: "bg-gray-500" },
];

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "userName", 
    header: "User Name",
  },
  {
    accessorKey: "orderDate", 
    header: "Order Date",
    cell: ({ row }) => {
      const date = row.getValue("orderDate") as string; 
      const formatted = moment(date).format("DD/MM/YYYY"); 
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "totalAmount", 
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = row.getValue("totalAmount") as number; 
      return <div>${amount.toFixed(2)}</div>; 
    },
  },
  {
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusObj = orderStatuses.find(s => s.value === status);
      return (
        <div className={`text-white font-bold py-1 px-3 rounded ${statusObj?.color} w-[100px] text-center`}>
          {statusObj?.label}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original; 
      const { toast } = useToast();
      const { updateOrderStatus } = useUpdateOrderStatus(); 
      const [isModalOpen, setIsModalOpen] = useState(false); 

      const handleUpdateStatus = async (newStatus: string) => {
        const orderUpdateData: OrderUpdateDto = {
          id: order.id,
          status: newStatus, 
        };
      
        await updateOrderStatus(orderUpdateData);
        toast({ title: "Order status updated successfully!", variant: "success" });
        window.location.reload(); 
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.id.toString())}
              >
                Copy Order ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                Order Details
              </DropdownMenuItem>
              {orderStatuses.map((status) => (
                <DropdownMenuItem key={status.value} onClick={() => handleUpdateStatus(status.value)}>
                  <div className={`flex items-center ${status.color} text-white rounded px-2 w-full`}>
                    {status.label}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Modal for Order Items */}
          <OrderItemsModal
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            orderId={order.id} // Pass the order ID to the modal
          />
        </>
      );
    },
  },
];