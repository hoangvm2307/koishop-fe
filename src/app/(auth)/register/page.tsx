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
    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="container mx-auto mt-20 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">REGISTER</h1>
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
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
            Email
          </label>
          <Input 
            type="email" 
            id="email" 
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address"
              }
            })} 
            placeholder="Enter your email" 
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-700 mb-1">
            Phone Number
          </label>
          <Input 
            type="tel" 
            id="phoneNumber" 
            {...register("phoneNumber", { 
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number (must be 10 digits)"
              }
            })} 
            placeholder="Enter your phone number" 
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
            Password
          </label>
          <Input 
            type="password" 
            id="password" 
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              }
            })} 
            placeholder="Enter your password" 
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-1">
            Confirm Password
          </label>
          <Input 
            type="password" 
            id="confirmPassword" 
            {...register("confirmPassword", { 
              required: "Confirm password is required",
              validate: (val: string) => {
                if (watch('password') != val) {
                  return "Passwords do not match";
                }
              }
            })}
            placeholder="Confirm your password" 
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Registering..." : "Register"}
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
          Login now
        </Link>
      </p>
    </div>
  );
}