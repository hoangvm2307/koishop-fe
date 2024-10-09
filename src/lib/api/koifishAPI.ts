import api from "@/lib/axios";
export interface KoiFish {
  id: string;
  name: string;
  image: string;
  price: number;
  size: string;
}
export const getKoiFishList = async () => {
  const response = await api.get("/api/koifish");
  return response.data;
};
