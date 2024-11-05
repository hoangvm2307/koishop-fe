import api from "@/lib/axios";

export interface LoginFormData {
  username: string;
  password: string;
}

interface RegisterFormData {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterFormDataWithConfirmation extends RegisterFormData {
  confirmPassword: string;
}

export const loginUser = async (data: LoginFormData) => {
  const response = await api.post("/api/account/login", data);
  return response.data;
};

export const registerUser = async (data: RegisterFormData) => {
  const response = await api.post("/api/account/register", data);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/api/Account");
  return response.data;
};
