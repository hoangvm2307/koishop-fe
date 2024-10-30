import api from "@/lib/axios";
 
interface RatingCreationDto {
  ratingValue: number;
  comment: string;
  userId: number;
  koiFishId: number;
}
export interface Rating extends RatingCreationDto {
  id: number;
  dateCreated: string;
  userName: string;
}
export const postRating = async (data: RatingCreationDto) => {
  const response = await api.post("/api/rating", data);
  return response.data;
};