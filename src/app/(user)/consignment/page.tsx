"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { toast } from "react-toastify";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { uploadImage } from "@/lib/firebaseUtils";
import { createKoiFish, KoiFish, KoiFishCreate } from "@/lib/api/koifishApi";
import { createConsignment } from "@/lib/api/consignmentApi";
import { ConsignmentCreate } from "@/lib/api/consignmentApi";

interface ConsignmentForm extends KoiFishCreate {
  consignmentType: string;
}
export default function ConsignmentPage() {
  // get user id from local storage
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const [imagePreview, setImagePreview] = useState<string>("");
  const form = useForm<ConsignmentForm>();

  const onSubmit = async (data: ConsignmentForm) => {
    try {
      // Tạo Koi fish trước
      const koiFishData = {
        ...data,
        userId: userData.id, // Thêm userId từ userData
        status: "AVAILABLE", // Thêm status mặc định nếu cần
      };
      const koiFishResponse = await createKoiFish(userData.id, koiFishData);
      console.log(koiFishResponse);
      // Tạo consignment sau khi có Koi fish
      const consignmentData: ConsignmentCreate = {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 ngày từ hiện tại
        consignmentType: "ONLINE", // hoặc giá trị phù hợp với yêu cầu của bạn
        status: "PENDING",
        userID: userData.id,
        consignmentItems: [
          {
            koiFishId: koiFishResponse.id, // ID của Koi fish vừa tạo
            price: data.price,
          },
        ],
      };

      const consignmentResponse = await createConsignment(consignmentData);

      if (consignmentResponse) {
        toast.success("Koi fish and consignment created successfully!");
      } else {
        toast.error("Failed to create consignment");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const downloadURL = await uploadImage(file);
      setImagePreview(downloadURL);
      form.setValue("imageUrl", downloadURL); // Cập nhật giá trị vào form
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image");
    }
  };
  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-4xl  py-2 px-4 mx-auto border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl">SELL YOUR KOI</CardTitle>
          <CardDescription className="text-lg">
            List your beautiful koi fish for sale on our platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Basic Information</h3>

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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select origin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Japan">Japan</SelectItem>
                            <SelectItem value="Indonesia">Indonesia</SelectItem>
                            <SelectItem value="Thailand">Thailand</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    rules={{ required: "Gender is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MALE">Male</SelectItem>
                            <SelectItem value="FEMALE">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    rules={{ required: "Type is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PUREIMPORTED">Pure Imported</SelectItem>
                            <SelectItem value="HYBRIDF1">Hybrid F1</SelectItem>
                            <SelectItem value="PUREVIETNAMESE">Pure Vietnamese</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Physical Characteristics */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Physical Characteristics</h3>

                  <FormField
                    control={form.control}
                    name="age"
                    rules={{ required: "Age is required", min: 0 }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age (years)</FormLabel>
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
                    rules={{ required: "Size is required", min: 0 }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size (cm)</FormLabel>
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personality</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dailyFoodAmount"
                    rules={{ required: "Daily food amount is required", min: 0 }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Food Amount (grams)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Pricing and Image */}

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Pricing and Image</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="consignmentType"
                    rules={{ required: "Consignment type is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consignment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select consignment type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ONLINE">Online</SelectItem>
                            <SelectItem value="OFFLINE">Offline</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    rules={{ required: "Price is required", min: 0 }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="listPrice"
                    rules={{ required: "List price is required", min: 0 }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>List Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="imageUrl"
                  rules={{ required: "Image is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="cursor-pointer"
                          />
                          <Input
                            type="text"
                            {...field}
                            value={field.value || ""}
                            placeholder="Image URL will be generated automatically"
                            disabled
                            className="bg-gray-50"
                          />
                        </div>
                      </FormControl>
                      {imagePreview && (
                        <div className="mt-4">
                          <Image
                            src={imagePreview}
                            alt="Koi preview"
                            width={200}
                            height={200}
                            className="rounded-lg object-cover"
                          />
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Listing
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
