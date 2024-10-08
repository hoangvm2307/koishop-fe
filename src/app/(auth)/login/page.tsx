"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => 
      api.post("/api/account/login", data),
    onSuccess: (data) => {
      console.log("Đăng nhập thành công", data);
      router.push("/dashboard");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
      console.error("Đăng nhập thất bại", error);
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
        <a href="#" className="font-medium text-primary hover:text-primary-dark">
          Register now
        </a>
      </p>
    </div>
  );
}