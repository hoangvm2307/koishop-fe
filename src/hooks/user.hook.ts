import { getUsers } from "@/lib/api/auth";
import { User } from "@/models/user";
import { useEffect, useState } from "react";

export const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false); 
    try {
      const response = await getUsers();
      if (!Array.isArray(response)) {
        throw new Error("Expected an array but received: " + JSON.stringify(response));
      }
      setUsers(response);
      setIsSuccess(true); 
    } catch (error: any) {
      setError("Failed to fetch users. Please try again.");
      setIsSuccess(false); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { data: users, isLoading, error, isSuccess, fetchUsers }; 
};