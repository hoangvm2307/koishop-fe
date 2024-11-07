import React, { useEffect } from "react";
import { OrderItem } from "@/models/order"; // Import the OrderItem interface
import { useGetOrderItems } from "@/hooks/order.hook"; // Import the hook

interface OrderItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number; // Pass orderId to fetch items
}

const OrderItemsModal: React.FC<OrderItemsModalProps> = ({ isOpen, onClose, orderId }) => {
  const { items, isLoading, error, fetchOrderItems } = useGetOrderItems(orderId); // Use the hook

  useEffect(() => {
    if (isOpen) {
      fetchOrderItems(); // Fetch order items when the modal opens
    }
  }, [isOpen, fetchOrderItems]); // Fetch items when modal opens

  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
      <div
        className="bg-white rounded-lg p-4 z-10 w-11/12 md:w-7/12 lg:w-7/12"
        style={{
          maxHeight: '80vh', // Set max height to allow for scrolling
          overflowY: 'auto', // Enable vertical scrolling
          marginTop: '20vh', // Set top margin to 20% of the viewport height
        }}
      >
        <h2 className="text-xl font-bold">Order Items</h2>
        {isLoading && <div>Loading order items...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <ul>
          {items.map(item => (
            <li key={item.id} className="border-b py-2">
              <div>ID: {item.id}</div>
              <div>Price: ${item.price.toFixed(2)}</div>
              <div>Order ID: {item.orderId}</div>
              <div>Koi Fish ID: {item.koiFishId}</div>
              <div>Koi Fish Name: {item.koiFishName}</div>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderItemsModal;