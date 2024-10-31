import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectItem, SelectValue, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateConsignment } from "@/lib/api/consignmentApi";
import { KoiFish, updateKoiFish } from "@/lib/api/koifishApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface KoiFishTableProps {
  koiFishes: KoiFish[];
  loading: boolean;
}

// ... existing imports và interface ...

export default function KoiFishTable({ koiFishes, loading }: KoiFishTableProps) {
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fish Name</TableHead>
                <TableHead>Breed</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {koiFishes.map((fish) => (
                <TableRow key={fish.id}>
                  <TableCell>{fish.id}</TableCell>
                  <TableCell>{fish.name}</TableCell>
                  <TableCell>{fish.breed.breedName}</TableCell>
                  <TableCell>{fish.size} cm</TableCell>
                  <TableCell>{fish.price.toLocaleString("vi-VN")} ₫</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        fish.status
                      )}`}
                    >
                      {translateStatus(fish.status)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "AVAILABLE":
      return "bg-green-100 text-green-800";
    case "SOLD":
      return "bg-blue-100 text-blue-800";
    case "RESERVED":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function translateStatus(status: string) {
  switch (status) {
    case "AVAILABLE":
      return "Available";
    case "SOLD":
      return "Sold";
    case "RESERVED":
      return "Reserved";
    default:
      return "Unknown";
  }
}
