// src/lib/api/fishcareApi.ts
import { FishCareCreationDto, FishCareUpdateDto } from "@/models/fishCare";
import api from "../axios";

export const getFishCare = async () => {
    const response = await api.get(`/api/FishCare`);
    return response.data;
};

export const addFishCare = async (FishCareCreationDto: FishCareCreationDto) => {
    const response = await api.post(`/api/FishCare`, FishCareCreationDto);
    return response.data;
};

export const getFishCareByFishId = async (fishId: number) => {
    const response = await api.get(`/api/FishCare/fish/${fishId}`);
    return response.data;
};

export const updateFishCare = async (id: number, FishCareUpdateDto: FishCareUpdateDto) => {
    const response = await api.put(`/api/FishCare/${id}`, FishCareUpdateDto);
    return response.data;
};

export const deleteFishCare = async (id: number) => {
    const response = await api.delete(`/api/FishCare/${id}`);
    return response.data;
};