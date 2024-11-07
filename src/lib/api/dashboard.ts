import api from "../axios";

export const getFavCustomer = async () => {
    const response = await api.get(`/api/Dashboard/fav-customer`);
    return response.data;
  };
  
export const getRankingOrigin = async () => {
    const response = await api.get(`/api/Dashboard/ranking-origin`);
    return response.data;
  };
  
export const getConsignmentByType = async () => {
    const response = await api.get(`/api/Dashboard/consignment-by-type`);
    return response.data;
  };
  
export const getConsignmentByMonth = async () => {
    const response = await api.get(`/api/Dashboard/consignment-by-month`);
    return response.data;
  };
  