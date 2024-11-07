import api from "@/lib/axios";
import qs from "qs";
import { Rating } from "./ratingApi";
export interface PaginationInfo {
  CurrentPage: number;
  TotalPages: number;
  PageSize: number;
  TotalCount: number;
}

export interface KoiFish {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  size: string;
  type: string;
  origin: string;
  status: string;
  finType: string;
  ratings: Rating[];
  personality: string;
  breed: Breed;
  gender: string;
  dailyFoodAmount: string;
}
export interface Breed {
  id: number;
  breedName: string;
  screeningRatio: string;
  personality: string;
}
export interface KoiFishCreate {
  name: string;
  origin: string;
  gender: string;
  age: number;
  size: number;
  personality: string;
  dailyFoodAmount: number;
  type: string;
  price: number;
  listPrice: number;
  imageUrl: string;
  status: string;
  userId: number;
}
export interface NumericFilterData {
  minPrice: number;
  maxPrice: number;
  minAge: number;
  maxAge: number;
  userId: number;
}

export interface ArrayFilterData {
  origin: string[];
  sizes: string[];
  genders: string[];
  types: string[];
  status: string[];
  breedName: string[];
}
export interface FilterData extends NumericFilterData, ArrayFilterData {
  OrderBy?: string;
  PageNumber?: number;
  PageSize?: number;
}

export const getKoiFishList = async (filters?: Partial<FilterData>) => {
  const params = {
    ...filters,
    OrderBy: filters?.OrderBy || "id",
    PageNumber: filters?.PageNumber || 1,
    PageSize: filters?.PageSize || 6,
  };

  const response = await api.get("/api/koifish", {
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });

  const paginationHeader = response.headers["pagination"];
  let paginationInfo: PaginationInfo | null = null;

  if (paginationHeader) {
    try {
      paginationInfo = JSON.parse(paginationHeader);
    } catch (error) {
      console.error("Lỗi khi phân tích thông tin phân trang:", error);
    }
  }

  return {
    items: response.data,
    pagination: paginationInfo,
  };
};

export const getKoiFishById = async (id: string) => {
  const response = await api.get(`/api/koifish/${id}`);
  return response.data;
};

export const getKoifishFilter = async () => {
  const response = await api.get("/api/koifish/filter");
  return response.data;
};

export const getKoiFishByIds = async (ids: string[]) => {
  const response = await api.get("/api/KoiFish/list-ids", {
    params: { ids },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
  });
  return response.data;
};

export const getRelatedKoiFish = async (id: number) => {
  const response = await api.get(`/api/KoiFish/related/${id}`);
  return response.data;
};

export const createKoiFish = async (userId: number, data: KoiFishCreate) => {
  const response = await api.post(`/api/KoiFish/${userId}`, data);
  return response.data;
};

export const updateKoiFish = async (id: string, data: KoiFish) => {
  const response = await api.put(`/api/KoiFish/${id}`, data);
  return response.data;
};

export const deleteKoiFish = async (id: string) => {
  const response = await api.delete(`/api/KoiFish/${id}`);
  return response.data;
};
