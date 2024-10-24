"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { LoginFormData, loginUser } from "@/lib/api/auth";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
 

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); 

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/cart");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Login failed. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
      console.error("Login failed", error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="container mx-auto mt-20 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-1">
            Username
          </label>
          <Input 
            type="text" 
            id="username" 
            {...register("username", { required: "Username is required" })} 
            placeholder="Enter your username" 
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
            Password
          </label>
          <Input 
            type="password" 
            id="password" 
            {...register("password", { required: "Password is required" })} 
            placeholder="Enter your password" 
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-primary hover:text-primary-dark">
              Forgot password?
            </a>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:text-primary-dark">
          Register now
        </Link>
      </p>
    </div>
  );
}
