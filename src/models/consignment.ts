// src/models/consignment.ts
export interface ConsignmentItem {
    id: number;
    price: number;
    orderId: number;
    koiFishId: number;
    koiFishName: string;
}

export interface Consignment {
    id: number;
    startDate: string;
    endDate: string;
    consignmentType: string;
    price: number;
    status: string;
    userId: number;
}

export type ConsignmentUpdateDto = {
    id: number;
    status: string;
};