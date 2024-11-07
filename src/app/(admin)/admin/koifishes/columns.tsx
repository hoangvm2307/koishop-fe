// src/app/(admin)/admin/koifish/columns.tsx
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
import { useToast } from "@/hooks/use-toast";
import { KoiFish } from "@/lib/api/koifishAPI";
import { useDeleteKoiFish } from "@/hooks/koifish.hook";

export const columns: ColumnDef<KoiFish>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className={`text-white rounded-md px-2 py-1 text-center w-[150px] ${
          status === "AVAILABLE" ? "bg-green-500" : 
          status === "SOLD" ? "bg-red-500" : 
          status === "RESERVED" ? "bg-yellow-500" : 
          "bg-gray-500" 
        }`}>
            {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const koiFish = row.original;
      const { toast } = useToast();
      const { deleteKoiFish } = useDeleteKoiFish();
      
      const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete Koi Fish ID: ${koiFish.id}?`)) {
          console.log("Deleting Koi Fish ID: ", koiFish.id);
          try {
            await deleteKoiFish(koiFish.id); 
            toast({
              title: "Koi Fish deleted successfully",
              description: "Koi Fish has been deleted successfully",
            });
            alert("Koi Fish deleted successfully");
            window.location.reload();
          } catch (error) {
            console.error(error);
            toast({
              title: "Failed to delete Koi Fish",
              description: "Failed to delete Koi Fish",
            });
          }
        }
      };

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
              onClick={() => navigator.clipboard.writeText(koiFish.id.toString())}
            >
              Copy Koi Fish ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>
              Delete Koi Fish
            </DropdownMenuItem>
            {/* Add more actions like Edit here */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];