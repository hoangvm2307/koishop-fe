import { getStaffs } from "@/lib/api/staffApi";
import { User } from "@/models/user";
import { useEffect, useState } from "react";

export const useGetStaffs = () => {
  const [staffs, setStaffs] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchStaffs = async () => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false); 
    try {
      const response = await getStaffs();
      if (!Array.isArray(response)) {
        throw new Error("Expected an array but received: " + JSON.stringify(response));
      }
      setStaffs(response);
      setIsSuccess(true); 
    } catch (error: any) {
      setError("Failed to fetch users. Please try again.");
      setIsSuccess(false); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  return { data: staffs, isLoading, error, isSuccess, fetchStaffs }; 
};