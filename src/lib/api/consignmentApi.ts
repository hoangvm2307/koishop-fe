import api from "../axios";

export interface ConsignmentItem {
  koiFishId: number;
  price: number;
}

export interface ConsignmentCreate {
  startDate: string;
  endDate: string;
  consignmentType: string;
  status: string;
  userID: number;
  consignmentItems: ConsignmentItem[];
}

export const createConsignment = async (data: ConsignmentCreate) => {
  const response = await api.post(`/api/Consignment`, data);
  return response.data;
};
