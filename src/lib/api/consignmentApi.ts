import { ConsignmentUpdateDto } from "@/models/consignment";
import api from "../axios";

export interface ConsignmentItem {
  koiFishId: number;
  price: number;
}

export interface Consignment {
  id: number;
  startDate: string;
  endDate: string;
  consignmentType: string;
  price: number;
  status: string;

  userId: number;
  consignmentItems: ConsignmentItem[];
}
export interface ConsignmentCreate {
  startDate: string;
  endDate: string;
  consignmentType: string;
  status: string;

  userId: number;
  consignmentItems: ConsignmentItem[];
}

export const createConsignment = async (data: ConsignmentCreate) => {
  const response = await api.post(`/api/Consignment`, data);
  return response.data;
};

export const updateConsignment = async (id: number, data: Consignment) => {
  const response = await api.put(`/api/Consignment/${id}`, data);
  return response.data;
};

export const getConsignmentByUserId = async (userId: number) => {
  const response = await api.get(`/api/Consignment/user/${userId}`);
  return response.data;
};

export const cancelConsignment = async (id: number) => {
  const response = await api.put(`/api/Consignment/cancel/${id}`);
  return response.data;
};

export const getConsignments = async () => {
  const response = await api.get("/api/Consignment");
  return response.data;
};

export const updateConsignmentStatusApi = async (data: ConsignmentUpdateDto) => {
  const response = await api.patch(`/api/Consignment/consignment/status`, data);
  return response.data;
};
