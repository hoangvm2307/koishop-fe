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
import { User } from "@/models/user"; 

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id", 
    header: "ID",
  },
  {
    accessorKey: "userName", 
    header: "User Name",
  },
  {
    accessorKey: "email", 
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () => {
      return (
        <div className="text-white bg-green-500 rounded-md px-2 py-1 text-center">
          Active
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
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
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy User ID
            </DropdownMenuItem>
            {/* <DropdownMenuItem>Edit User</DropdownMenuItem>
            <DropdownMenuItem>
              Delete User
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];