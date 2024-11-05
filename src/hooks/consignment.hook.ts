// src/hooks/consignment.hook.ts
import { useEffect, useState } from "react";
import { Consignment, getConsignments, updateConsignmentStatusApi } from "@/lib/api/consignmentApi";
import { ConsignmentUpdateDto } from "@/models/consignment";

export const useGetConsignments = () => {
    const [consignments, setConsignments] = useState<Consignment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchConsignments = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getConsignments();

            console.log(response);

            if (!response || !Array.isArray(response)) {
                throw new Error("Expected an array but received: " + JSON.stringify(response));
            }
            const data = response.sort((a: Consignment, b: Consignment) => b.id - a.id);
            setConsignments(data);
        } catch (error: any) {
            setError("Failed to fetch consignments. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchConsignments();
    }, []);

    return { consignments, isLoading, error, fetchConsignments };
};

export const useUpdateConsignmentStatus = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateConsignmentStatus = async (data: ConsignmentUpdateDto) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await updateConsignmentStatusApi(data);
            setSuccess(true);
            return response;
        } catch (err: any) {
            setError(err.message || "An error occurred while updating the consignment status.");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, updateConsignmentStatus, success };
};