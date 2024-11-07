"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DataTableSkeleton from "@/components/dataTableSkelenton";
import { columns } from "./columns";
import { DataTable } from "../account/data-table";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { useGetUsers } from "@/hooks/user.hook";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "react-toastify";
import { PlusCircle } from "lucide-react";
import { createStaff } from "@/lib/api/staffApi";
import { useGetStaffs } from "@/hooks/staff.hook";

interface StaffFormData {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
}

function UserPage() {
  const { data: staffs, isLoading, error, fetchStaffs } = useGetStaffs();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<StaffFormData>();

  const onSubmit = async (data: StaffFormData) => {
    try {
      const response = await createStaff(data);
      console.log(response);

      toast.success("Staff created successfully");
      setIsDialogOpen(false);
      form.reset();
      fetchStaffs();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create staff");
      }
      console.error(error);
    }
  };

  return (
    <ContentLayout title="Users">
      <div className="bg-shade-1-100% text-shade-2-100% space-y-4 rounded-[8px] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Staffs</h2>
            <p className="text-muted-foreground">
              Manage staffs...
              <button onClick={fetchStaffs} className="ml-2 text-blue-500 hover:underline">
                refresh
              </button>
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Staff
          </Button>
        </div>

        {isLoading ? (
          <DataTableSkeleton columns={columns.length} rows={10} />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <DataTable columns={columns} data={staffs} />
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="userName"
                  rules={{ required: "Username is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number format",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Staff</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </ContentLayout>
  );
}

export default UserPage;
