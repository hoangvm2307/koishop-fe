// src/app/(admin)/admin/consignments/FishCareCreationModal.tsx
import { ConsignmentItem } from "@/models/consignment";
import { FishCareCreationDto } from "@/models/fishCare";
import React, { useEffect, useState } from "react";

interface FishCareCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateFishCare: (data: FishCareCreationDto) => void;
    consignmentItems: ConsignmentItem[];
    userId: number;
    selectedIndex: number;
}

const FishCareCreationModal: React.FC<FishCareCreationModalProps> = ({ isOpen, onClose, onCreateFishCare, consignmentItems, userId, selectedIndex }) => {
    const [formData, setFormData] = useState<FishCareCreationDto>({
        startDate: new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })).toISOString().slice(0, 16),
        endDate: "",
        careInstructions: "",
        status: "ACTIVE", 
        koiFishId: consignmentItems[selectedIndex]?.koiFishId || 0, 
        userId: userId,
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                startDate: new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })).toISOString().slice(0, 16),
                endDate: "",
                careInstructions: "",
                status: "ACTIVE",
                koiFishId: consignmentItems[selectedIndex]?.koiFishId || 0, 
                userId: userId,
            });
        }
    }, [isOpen, consignmentItems, userId, selectedIndex]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            alert("End Date must be greater than Start Date.");
            return;
        }

        onCreateFishCare(formData); 
        onClose();
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
                <h2 className="text-xl font-bold mb-4">Create Fish Care</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block mb-1"><strong>Start Date:</strong></label>
                        <input
                            disabled={true}
                            type="datetime-local"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1"><strong>End Date:</strong></label>
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1"><strong>Care Instructions:</strong></label>
                        <textarea
                            name="careInstructions"
                            value={formData.careInstructions}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            rows={4}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1"><strong>Status:</strong></label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        >
                            <option value="ACTIVE">ACTIVE</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1"><strong>Koi Fish ID:</strong></label>
                        <input
                            type="number"
                            name="koiFishId"
                            value={formData.koiFishId}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1"><strong>User ID:</strong></label>
                        <input
                            type="number"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="mt-4 bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition duration-200">
                        Create Fish Care
                    </button>
                </form>
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white rounded px-4 py-2">
                    Close
                </button>
            </div>
        </div>
    );
};

export default FishCareCreationModal;