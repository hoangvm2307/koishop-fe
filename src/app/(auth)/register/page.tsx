"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { RegisterFormDataWithConfirmation, registerUser } from "@/lib/api/auth";
 

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormDataWithConfirmation>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful", data);
      router.push("/login");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Registration failed. Please try again.");
      } else {
        setError("An unknown error occurred.");
      }
      console.error("Registration failed", error);
    },
  });

  const onSubmit = (data: RegisterFormDataWithConfirmation) => {
    // Loại bỏ confirmPassword trước khi gửi dữ liệu
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="container mx-auto mt-20 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">ĐĂNG KÝ</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-1">
            Tên người dùng
          </label>
          <Input 
            type="text" 
            id="username" 
            {...register("username", { required: "Tên người dùng là bắt buộc" })} 
            placeholder="Nhập tên người dùng" 
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
            Email
          </label>
          <Input 
            type="email" 
            id="email" 
            {...register("email", { 
              required: "Email là bắt buộc",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email không hợp lệ"
              }
            })} 
            placeholder="Nhập email của bạn" 
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700 mb-1">
            Số điện thoại
          </label>
          <Input 
            type="tel" 
            id="phoneNumber" 
            {...register("phoneNumber", { 
              required: "Số điện thoại là bắt buộc",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Số điện thoại không hợp lệ (phải có 10 chữ số)"
              }
            })} 
            placeholder="Nhập số điện thoại của bạn" 
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
            Mật khẩu
          </label>
          <Input 
            type="password" 
            id="password" 
            {...register("password", { 
              required: "Mật khẩu là bắt buộc",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự"
              }
            })} 
            placeholder="Nhập mật khẩu" 
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-1">
            Xác nhận mật khẩu
          </label>
          <Input 
            type="password" 
            id="confirmPassword" 
            {...register("confirmPassword", { 
              required: "Xác nhận mật khẩu là bắt buộc",
              validate: (val: string) => {
                if (watch('password') != val) {
                  return "Mật khẩu không khớp";
                }
              }
            })}
            placeholder="Xác nhận mật khẩu" 
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
          Đăng nhập ngay
        </Link>
      </p>
    </div>
  );
}
