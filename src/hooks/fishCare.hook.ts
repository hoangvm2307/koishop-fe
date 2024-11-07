// src/hooks/fishCare.hook.ts
import { useEffect, useState } from "react";
import { getFishCare, addFishCare, updateFishCare, deleteFishCare, getFishCareByFishId } from "@/lib/api/fishcareApi";
import { FishCareCreationDto, FishCareUpdateDto } from "@/models/fishCare";
import { FishCare } from "@/models/fishCare";

export const useGetFishCareByFishId = () => {
    const [fishCares, setFishCares] = useState<FishCare[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFishCareByFishId = async (fishId: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getFishCareByFishId(fishId);
            setFishCares(response);
            return response;
        } catch (error: any) {
            setError("Failed to fetch fish care details. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return { fishCares, isLoading, error, fetchFishCareByFishId };
};

export const useGetFishCare = () => {
    const [fishCareList, setFishCareList] = useState<FishCare[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFishCare = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getFishCare();
            if (!response || !Array.isArray(response)) {
                throw new Error("Expected an array but received: " + JSON.stringify(response));
            }
            setFishCareList(response);
        } catch (error: any) {
            setError("Failed to fetch fish care entries. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFishCare();
    }, []);

    return { fishCareList, isLoading, error, fetchFishCare };
};

export const useCreateFishCare = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const createFishCare = async (data: FishCareCreationDto) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await addFishCare(data);
            setSuccess(true);
            return response;
        } catch (err: any) {
            setError(err.message || "An error occurred while creating the fish care entry.");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, createFishCare, success };
};

export const useUpdateFishCare = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateFishCareFunction = async (data: FishCareUpdateDto) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await updateFishCare(data.id, data);
            setSuccess(true);
            return response;
        } catch (err: any) {
            setError(err.message || "An error occurred while updating the fish care entry.");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, updateFishCareFunction, success };
};

export const useDeleteFishCare = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const deleteFishCareFunction = async (id: number) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await deleteFishCare(id);
            setSuccess(true);
            return response;
        } catch (err: any) {
            setError(err.message || "An error occurred while deleting the fish care entry.");
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, deleteFishCareFunction, success };
};