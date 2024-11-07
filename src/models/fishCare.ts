export type FishCare = {
    id: number;
    startDate: string;
    endDate: string;
    careInstructions: string;
    status: string;
    careId: number;
    koiFishId: number;
    koiFish: any | null;
    userId: number;
    user: any | null;
}

export type FishCareCreationDto = {
    startDate: string;
    endDate: string;
    careInstructions: string;
    status: "ACTIVE" | "INACTIVE"; 
    koiFishId: number;
    userId: number;
}

export type FishCareUpdateDto = {
    id: number;
    startDate: string;
    endDate: string;
    careInstructions: string;
    status: string; 
    careId: number;
    koiFishId: number;
    userId: number;
}