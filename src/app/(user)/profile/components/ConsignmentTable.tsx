import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cancelConsignment, Consignment } from "@/lib/api/consignmentApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface ConsignmentTableProps {
  consignments: Consignment[];
  loading: boolean;
  onUpdate?: () => void;
}

export default function ConsignmentTable({ consignments, loading, onUpdate }: ConsignmentTableProps) {
  const [selectedConsignment, setSelectedConsignment] = useState<Consignment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCancel = async () => {
    if (!selectedConsignment) return;

    try {
      await cancelConsignment(selectedConsignment.id);
      toast.success("Đã hủy kí gửi thành công");
      setIsDialogOpen(false);
      onUpdate?.();
    } catch (error) {
      toast.error("Không thể hủy kí gửi");
      console.error("Error cancelling consignment:", error);
    }
  };

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
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consignments.map((consignment) => (
                <TableRow key={consignment.id}>
                  <TableCell>{consignment.id}</TableCell>
                  <TableCell>{new Date(consignment.startDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(consignment.endDate).toLocaleDateString()}</TableCell>
                  <TableCell>{consignment.consignmentType}</TableCell>
                  <TableCell>{consignment.price.toLocaleString("vi-VN")} ₫</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        consignment.status
                      )}`}
                    >
                      {translateStatus(consignment.status)}
                    </span>
                  </TableCell>
                  <TableCell>{consignment.consignmentItems.length} items</TableCell>
                  <TableCell>
                    {consignment.status === "APPROVED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedConsignment(consignment);
                          setIsDialogOpen(true);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm cancellation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p>Are you sure you want to cancel this consignment?</p>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">ID:</span> {selectedConsignment?.id}
                  </p>
                  <p>
                    <span className="font-medium">Start date:</span>{" "}
                    {selectedConsignment && new Date(selectedConsignment.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">End date:</span>{" "}
                    {selectedConsignment && new Date(selectedConsignment.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Price:</span>{" "}
                    {selectedConsignment?.price.toLocaleString("vi-VN")} ₫
                  </p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleCancel}>
                    Confirm cancellation
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    case "CANCELLED":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function translateStatus(status: string) {
  switch (status) {
    case "PENDING": 
      return "Pending";
    case "APPROVED":
      return "Approved";
    case "REJECTED":
      return "Rejected";
    case "CANCELLED":
      return "Cancelled";
    default:
      return "Unknown";
  }
}
