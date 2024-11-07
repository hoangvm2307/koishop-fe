// src/app/(admin)/admin/koifishes/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DataTableSkeleton from "@/components/dataTableSkelenton";
import { columns } from "./columns";
import { DataTable } from "../account/data-table";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "react-toastify";
import { PlusCircle } from "lucide-react";
import { useCreateKoiFish, useKoiFishList } from "@/hooks/koifish.hook";
import { KoiFishCreate } from "@/lib/api/koifishAPI";

const KoiFishPage = () => {
  const { data: koiFish, loading, error, fetchKoiFishList } = useKoiFishList(); 
  const { createNewKoiFish } = useCreateKoiFish();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  console.log("userId", userId);
  const form = useForm<KoiFishCreate>({
      defaultValues: {
          userId: userId, 
      },
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(Number(user?.id));
    }
  }, []);

  const onSubmit = async (data: KoiFishCreate) => {
    try {
        form.setValue("userId", userId);
        const response = await createNewKoiFish(userId, data); 

        toast.success("Koi fish created successfully");
        setIsDialogOpen(false); // Close the modal
        form.reset(); // Reset the form fields
        fetchKoiFishList(); // Refresh the Koi fish list
    } catch (error) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("Failed to create Koi fish");
        }
        console.error(error);
    }
};

  return (
    <ContentLayout title="Koi Fish">
      <div className="bg-shade-1-100% text-shade-2-100% space-y-4 rounded-[8px] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Koi Fish</h2>
            <p className="text-muted-foreground">
              Manage Koi fish...
              <button onClick={() => fetchKoiFishList()} className="ml-2 text-blue-500 hover:underline">
                refresh
              </button>
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Koi Fish
          </Button>
        </div>

        {loading ? (
          <DataTableSkeleton columns={columns.length} rows={10} />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <DataTable columns={columns} data={koiFish} />
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Koi Fish</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="origin"
                  rules={{ required: "Origin is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Origin</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <select {...field} className="border rounded-md p-2">
                          <option value="">Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="UNKNOWN">Unknown</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  rules={{ required: "Age is required", min: { value: 0, message: "Age must be a positive number" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  rules={{ required: "Size is required", min: { value: 0, message: "Size must be a positive number" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personality"
                  rules={{ required: "Personality is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personality</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dailyFoodAmount"
                  rules={{ required: "Daily Food Amount is required", min: { value: 0, message: "Must be a positive number" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Food Amount</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  rules={{ required: "Type is required" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <select {...field} className="border rounded-md p-2">
                          <option value="">Select Type</option>
                          <option value="PUREIMPORTED">Pure Imported</option>
                          <option value="HYBRIDF1">Hybrid F1</option>
                          <option value="PUREVIETNAMESE">Pure Vietnamese</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="listPrice"
                  rules={{ required: "List Price is required", min: { value: 0, message: "Must be a positive number" } }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>List Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  rules={{ required: "Image URL is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select {...field} className="border rounded-md p-2">
                          <option value="">Select Status</option>
                          <option value="AVAILABLE">Available</option>
                          <option value="SOLD">Sold</option>
                          <option value="RESERVED">Reserved</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Koi Fish</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </ContentLayout>
  );
}

export default KoiFishPage;