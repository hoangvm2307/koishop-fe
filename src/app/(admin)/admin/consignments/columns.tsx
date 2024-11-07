// src/app/(admin)/admin/consignments/columns.tsx
import React, { useState } from "react";
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
import { useUpdateConsignmentStatus } from "@/hooks/consignment.hook"; 
import { Consignment, ConsignmentUpdateDto } from "@/models/consignment";
import ConsignmentItemsModal from "./ConsignmentItemsModal";

// Define the consignment statuses with colors
const consignmentStatuses = [
//   { value: "PENDING", label: "Pending", color: "bg-yellow-500" },
  { value: "APPROVED", label: "Approved", color: "bg-green-500" },
  { value: "REJECTED", label: "Rejected", color: "bg-red-500" },
//   { value: "COMPLETED", label: "Completed", color: "bg-blue-500" },
];


export const columns: ColumnDef<Consignment>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "userID",
        header: "User ID",
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => {
            const date = row.getValue("startDate") as string;
            const formatted = moment(date).format("DD/MM/YYYY");
            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => {
            const date = row.getValue("endDate") as string;
            const formatted = moment(date).format("DD/MM/YYYY");
            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = row.getValue("price") as number;
            return <div>${price.toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const statusObj = consignmentStatuses.find(s => s.value === status);
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
            const consignment = row.original;
            const { toast } = useToast();
            const { updateConsignmentStatus } = useUpdateConsignmentStatus();
            const [isModalOpen, setIsModalOpen] = useState(false);

            const handleUpdateStatus = async (newStatus: string) => {
                const consignmentUpdateData: ConsignmentUpdateDto = {
                    id: consignment.id,
                    status: newStatus,
                };

                await updateConsignmentStatus(consignmentUpdateData);
                toast({ title: "Consignment status updated successfully!", variant: "success" });
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
                            onClick={() => navigator.clipboard.writeText(consignment.id.toString())}
                        >
                            Copy Consignment ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setIsModalOpen(true)} // Open the consignment items modal
                        >
                            Consignment Items 
                        </DropdownMenuItem>
                        {consignmentStatuses.map((status) => (
                            <DropdownMenuItem key={status.value} onClick={() => handleUpdateStatus(status.value)}>
                                <div className={`flex items-center ${status.color} text-white rounded px-2 w-full`}>
                                    {status.label}
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <ConsignmentItemsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} consignmentItems={consignment.consignmentItems} userId={consignment.userID} />
                </>
            );
        },
    },
];