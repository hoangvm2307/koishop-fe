import api from "@/lib/axios";

export const getStaffs = async () => {
  const response = await api.get("/api/account/list-staff");
  return response.data;
};

export const createStaff = async (data: any) => {
  const response = await api.post("/api/account/register-staff", data);
  return response.data;
};
