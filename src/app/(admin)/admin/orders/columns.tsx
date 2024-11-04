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
import { Order } from "@/models/order";

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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const plan = row.original; // Get the original row data
      const { toast } = useToast();
      return (
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
              onClick={() => navigator.clipboard.writeText(plan.id.toString())}
            >
              Copy plan ID
            </DropdownMenuItem>
            <DropdownMenuItem>Edit plan</DropdownMenuItem>
            <DropdownMenuItem>
              Delete plan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];