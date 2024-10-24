import api from "@/lib/axios";
import qs from 'qs';
export interface KoiFish {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  type: string;
  origin: string;
  finType: string;
  personality: string;
  breeder: string;
  gender: string;
  dailyFoodAmount: string;
}
export interface NumericFilterData {
  minPrice: number;
  maxPrice: number;
  minAge: number;
  maxAge: number;
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
    OrderBy: filters?.OrderBy || 'id',
    PageNumber: filters?.PageNumber || 1,
    PageSize: filters?.PageSize || 12
  };

  const response = await api.get("/api/koifish", { 
    params,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    }
  });
  return response.data;
};


export const getKoiFishById = async (id: string) => {
  const response = await api.get(`/api/koifish/${id}`);
  return response.data;
};

export const getKoifishFilter = async () => {
  const response = await api.get("/api/koifish/filter");
  return response.data;
}

export const getKoiFishByIds = async (ids: string[]) => {
  const response = await api.get("/api/KoiFish/list-ids", {
    params: { ids },
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    }
  });
  return response.data;
};