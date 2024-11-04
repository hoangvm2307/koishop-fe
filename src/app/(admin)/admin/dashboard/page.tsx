"use client";
import React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Import necessary components
import SubscriptionChartContainer from "../components/dashboard/SubscriptionChartContainer"; // Import SubscriptionChartContainer
import { useGetOrderRevenue } from "@/hooks/order.hook";
const sampleData = {
  "1": { "revenueFromKoiShop": 100, "revenueFromCommission": 50, "totalCommissionOrders": 20, "completedOrders": 15 },
  "2": { "revenueFromKoiShop": 150, "revenueFromCommission": 70, "totalCommissionOrders": 25, "completedOrders": 20 },
  "3": { "revenueFromKoiShop": 200, "revenueFromCommission": 90, "totalCommissionOrders": 30, "completedOrders": 25 },
  "4": { "revenueFromKoiShop": 250, "revenueFromCommission": 110, "totalCommissionOrders": 35, "completedOrders": 30 },
  "5": { "revenueFromKoiShop": 300, "revenueFromCommission": 130, "totalCommissionOrders": 40, "completedOrders": 35 },
  "6": { "revenueFromKoiShop": 350, "revenueFromCommission": 150, "totalCommissionOrders": 45, "completedOrders": 40 },
  "7": { "revenueFromKoiShop": 400, "revenueFromCommission": 170, "totalCommissionOrders": 50, "completedOrders": 45 },
  "8": { "revenueFromKoiShop": 450, "revenueFromCommission": 190, "totalCommissionOrders": 55, "completedOrders": 50 },
  "9": { "revenueFromKoiShop": 500, "revenueFromCommission": 210, "totalCommissionOrders": 60, "completedOrders": 55 },
  "10": { "revenueFromKoiShop": 550, "revenueFromCommission": 230, "totalCommissionOrders": 65, "completedOrders": 60 },
  "11": { "revenueFromKoiShop": 600, "revenueFromCommission": 250, "totalCommissionOrders": 70, "completedOrders": 65 },
  "12": { "revenueFromKoiShop": 650, "revenueFromCommission": 270, "totalCommissionOrders": 75, "completedOrders": 70 },
  "13": { "revenueFromKoiShop": 4000, "revenueFromCommission": 2000, "totalCommissionOrders": 800, "completedOrders": 700 }
};

function DashboardPage() {
  const { data } = useGetOrderRevenue(2024);

  return (
    <ContentLayout title="Dashboard">
      <Tabs defaultValue="revenueFromKoiShop" className="w-auto">
        <TabsList className="flex space-x-2">
          <TabsTrigger value="revenueFromKoiShop" className="text-sm">Revenue from Koi Shop</TabsTrigger>
          <TabsTrigger value="revenueFromCommission" className="text-sm">Revenue from Commission</TabsTrigger>
          <TabsTrigger value="totalCommissionOrders" className="text-sm">Total Commission Orders</TabsTrigger>
          <TabsTrigger value="completedOrders" className="text-sm">Completed Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="revenueFromKoiShop" className="flex items-center justify-center h-full">
          <div style={{ height: '50vh', width: '70%' }}> {/* Full height and width for the chart */}
            <SubscriptionChartContainer data={data} chartType="revenueFromKoiShop" />
          </div>
        </TabsContent>
        <TabsContent value="revenueFromCommission" className="flex items-center justify-center h-full">
          <div style={{ height: '50vh', width: '70%' }}>
            <SubscriptionChartContainer data={data} chartType="revenueFromCommission" />
          </div>
        </TabsContent>
        <TabsContent value="totalCommissionOrders" className="flex items-center justify-center h-full">
          <div style={{ height: '50vh', width: '70%' }}>
            <SubscriptionChartContainer data={data} chartType="totalCommissionOrders" />
          </div>
        </TabsContent>
        <TabsContent value="completedOrders" className="flex items-center justify-center h-full">
          <div style={{ height: '50vh', width: '70%' }}>
            <SubscriptionChartContainer data={data} chartType="completedOrders" />
          </div>
        </TabsContent>
      </Tabs>
    </ContentLayout>
  );
}

export default DashboardPage;