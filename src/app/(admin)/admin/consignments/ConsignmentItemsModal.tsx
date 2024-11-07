// src/components/ConsignmentItemsModal.tsx
import { useGetFishCareByFishId } from "@/hooks/fishCare.hook"; // Import the hooks
import { ConsignmentItem } from "@/models/consignment";
import React, { useState, useEffect } from "react"; // Import useEffect
import FishCareDetailsModal from "./FishCareDetailsModal";

interface ConsignmentItemsModalProps {
    isOpen: boolean;
    onClose: () => void;
    consignmentItems: ConsignmentItem[];
    userId: number;
}

const ConsignmentItemsModal: React.FC<ConsignmentItemsModalProps> = ({ isOpen, onClose, consignmentItems, userId }) => {
    const [isFishCareModalOpen, setIsFishCareModalOpen] = useState(false);
    const [selectedFishCare, setSelectedFishCare] = useState<any | null>(null); 
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // State to hold the selected index
    const { fetchFishCareByFishId, isLoading: isFetching, error: fetchError } = useGetFishCareByFishId();

    const handleViewFishCare = async (koiFishId: number, index: number) => {
        try {
            const fetchedFishCares = await fetchFishCareByFishId(koiFishId); // Wait for the fetch to complete
            setSelectedFishCare(fetchedFishCares); // Use the fetched data
            setSelectedIndex(index); // Set the selected index
            setIsFishCareModalOpen(true);
        } catch (error) {
            console.error("Error fetching fish care details:", error);
        }
    };

    const refetchFishCares = async () => {
        // Implement your logic to refetch fish care data here
        // For example, you might want to call a function that fetches the fish care data
    };

    useEffect(() => {
        // You can call refetchFishCares here if needed
    }, []);

    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 flex items-start justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
            <div
                className="bg-white rounded-lg p-4 z-10 w-11/12 md:w-7/12 lg:w-7/12"
                style={{
                    maxHeight: '80vh',
                    overflowY: 'auto', 
                    marginTop: '20vh',
                }}
            >
                {consignmentItems.length === 0 ? ( 
                    <div className="text-center py-4">
                        <p>No consignment items available.</p>
                    </div>
                ) : (
                    <ul>
                        {consignmentItems.map((item: ConsignmentItem, index: number) => ( // Get the index here
                            <li key={item.id} className="border-b py-2 flex justify-between items-center">
                                <div>
                                    <div>ID: {item.id}</div>
                                    <div>Price: ${item.price.toFixed(2)}</div>
                                    <div>Koi Fish ID: {item.koiFishId}</div>
                                    <div>Koi Fish Name: {item.koiFishName}</div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleViewFishCare(item.koiFishId, index)} // Pass the index
                                        className="ml-4 bg-blue-500 text-white rounded px-2 py-1"
                                    >
                                        {isFetching ? "Loading..." : "View Fish Care"}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
                    Close
                </button>
            </div>
            <FishCareDetailsModal
                userId={userId}
                isOpen={isFishCareModalOpen} 
                onClose={() => setIsFishCareModalOpen(false)} 
                fishCares={selectedFishCare} 
                consignmentItems={consignmentItems}
                selectedIndex={selectedIndex} // Pass the selected index
                refetchFishCares={refetchFishCares} 
            />
        </div>
    );
};

export default ConsignmentItemsModal;