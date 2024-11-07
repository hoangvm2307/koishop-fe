// src/app/(admin)/admin/consignments/FishCareDetailsModal.tsx
import React, { useState } from "react";
import FishCareCreationModal from "./FishCareCreationModal"; // Import the creation modal
import { FishCareCreationDto } from "@/models/fishCare";
import { ConsignmentItem } from "@/models/consignment";
import { useCreateFishCare } from "@/hooks/fishCare.hook";

interface FishCareDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    fishCares: any[]; 
    consignmentItems: ConsignmentItem[];
    userId: number;
    refetchFishCares: () => void; 
    selectedIndex: number | null;
}

const statusColors: { [key: string]: string } = {
    ACTIVE: "bg-green-500 text-white",
    COMPLETED: "bg-blue-500 text-white",
    CANCELLED: "bg-red-500 text-white",
};

const FishCareDetailsModal: React.FC<FishCareDetailsModalProps> = ({ isOpen, onClose, fishCares, consignmentItems, userId, selectedIndex }) => {
    const [isCreationModalOpen, setCreationModalOpen] = useState(false); 
    const { createFishCare } =  useCreateFishCare();

    const handleCreateFishCare = (data: FishCareCreationDto) => {
        createFishCare(data)
            .then((response) => {
                alert("Fish Care created successfully!");
                setCreationModalOpen(false);
                // Optionally, you can call a refetch function here if needed
            })
            .catch((error) => {
                console.error("Error creating Fish Care:", error);
                alert("Failed to create Fish Care. Please try again.");
            });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-start justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose} />
            <div
                className="bg-white rounded-lg p-6 z-10 w-11/12 md:w-7/12 lg:w-7/12"
                style={{
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    marginTop: '20vh',
                }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Fish Care Details</h2>
                    <button 
                        onClick={() => setCreationModalOpen(true)} // Open the creation modal
                        className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition duration-200"
                    >
                        Create Fish Care
                    </button>
                </div>
                {fishCares?.length > 0 ? (
                    fishCares.map((fishCare, index) => (
                        <div 
                            key={fishCare.id} 
                            className={`mb-4 p-4 border rounded shadow-sm ${fishCare.status !== 'ACTIVE' ? 'bg-gray-200 text-gray-500' : 'bg-gray-50 text-black'}`} // Change background and text color based on status
                        >
                            <h3 className="font-semibold">Fish Care ID: {fishCare.id}</h3>
                            <div className="mt-2 flex flex-col gap-2">
                                <div><strong>Start Date:</strong> {new Date(fishCare.startDate).toLocaleString()}</div>
                                <div><strong>End Date:</strong> {new Date(fishCare.endDate).toLocaleString()}</div>
                                <div><strong>Care Instructions:</strong> {fishCare.careInstructions}</div>
                                <div className="flex items-center justify-start">
                                    <strong>Status:</strong> 
                                    <p className={`ml-2 px-2 rounded ${statusColors[fishCare.status]}`}>
                                        {fishCare.status}
                                    </p>
                                </div>
                                <div><strong>Koi Fish ID:</strong> {fishCare.koiFishId}</div>
                                <div><strong>User ID:</strong> {fishCare.userId}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        No fish care details available.
                    </div>
                )}
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
                    Close
                </button>
            </div>

            <FishCareCreationModal
                selectedIndex={selectedIndex || 0}
                userId={userId}
                consignmentItems={consignmentItems}
                isOpen={isCreationModalOpen} 
                onClose={() => setCreationModalOpen(false)} 
                onCreateFishCare={handleCreateFishCare} 
            />
        </div>
    );
};

export default FishCareDetailsModal;