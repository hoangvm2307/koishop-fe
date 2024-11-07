"use client";
import React, { useState } from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import SubscriptionChartContainer from "../components/dashboard/SubscriptionChartContainer";
import { useGetOrderRevenue } from "@/hooks/order.hook";
import { useGetFavCustomer, useGetRankingOrigin, useGetConsignmentByType, useGetConsignmentByMonth } from "@/hooks/dashboard.hook";
import FavCustomerLineChart from "../components/dashboard/FavCustomerChart";
import RankingOriginChart from "../components/dashboard/RankingOriginChart";
import ConsignmentByMonthChart from "../components/dashboard/ConsignmentChartByMonth";
import ConsignmentChart from "../components/dashboard/ConsignmentChart";
import { SAMPLE_CONSIGNMENT_BY_MONTH_DATA, SAMPLE_CONSIGNMENT_BY_TYPE_DATA, SAMPLE_FAV_CUSTOMER_DATA, SAMPLE_RANKING_ORIGIN_DATA } from "@/data/sampleData";

function DashboardPage() {
  const { data, loading, error } = useGetOrderRevenue(2024);
  const { favCustomer, loading: loadingFav, error: errorFav } = useGetFavCustomer();
  const { rankingOrigin, loading: loadingRanking, error: errorRanking } = useGetRankingOrigin();
  const { consignmentByType, loading: loadingConsignmentType, error: errorConsignmentType } = useGetConsignmentByType();
  const { consignmentByMonth, loading: loadingConsignmentMonth, error: errorConsignmentMonth } = useGetConsignmentByMonth();

  const [chartType, setChartType] = useState<"revenueFromKoiShop" | "revenueFromCommission" | "totalCommissionOrders" | "completedOrders">("revenueFromKoiShop");

  const calculatePercentageChange = (current: number, previous: number): { change: string; className: string } => {
    if (previous === 0) return { change: current > 0 ? "+100%" : "0%", className: current > 0 ? "text-green-500" : "text-red-500" };
    const change = ((current - previous) / previous) * 100;
    const className = change > 0 ? "text-green-500" : "text-red-500";
    return { change: `${change > 0 ? "+" : ""}${change.toFixed(1)}% This Month`, className };
  };

  if (loading || loadingFav || loadingRanking || loadingConsignmentType || loadingConsignmentMonth) {
    return <div>Loading...</div>; 
  }

  if (error || errorFav || errorRanking || errorConsignmentType || errorConsignmentMonth) {
    return <div>Error: {error || errorFav || errorRanking || errorConsignmentType || errorConsignmentMonth}</div>;
  }

  const currentMonth = new Date().getMonth() + 1; 
  const currentMonthData = data[currentMonth.toString()];

  if (!currentMonthData) {
    console.error(`Data for current month ${currentMonth} is not available.`);
    return null; 
  }

  const filteredData = { ...data };
  delete filteredData["13"]; 

  const previousMonthKey = (currentMonth - 1).toString();
  const previousMonthData = filteredData[previousMonthKey] || { revenueFromKoiShop: 0, revenueFromCommission: 0, totalCommissionOrders: 0, completedOrders: 0 };

  const revenueFromKoiShopChange = calculatePercentageChange(currentMonthData.revenueFromKoiShop, previousMonthData.revenueFromKoiShop);
  const revenueFromCommissionChange = calculatePercentageChange(currentMonthData.revenueFromCommission, previousMonthData.revenueFromCommission);
  const totalCommissionOrdersChange = calculatePercentageChange(currentMonthData.totalCommissionOrders, previousMonthData.totalCommissionOrders);
  const completedOrdersChange = calculatePercentageChange(currentMonthData.completedOrders, previousMonthData.completedOrders);

  const handleDivClick = (type: "revenueFromKoiShop" | "revenueFromCommission" | "totalCommissionOrders" | "completedOrders") => {
    setChartType(type);
  };

  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-row gap-4 bg-gray-50 p-4">
        <div className="w-1/2 h-[36vh] p-4 bg-white shadow-md rounded-lg">
          <SubscriptionChartContainer data={filteredData} chartType={chartType} />
        </div>
        <div className="w-1/2 h-1/2 grid grid-cols-2 grid-rows-2 gap-4">
          <div className="p-11 bg-white shadow-md rounded-lg flex flex-col justify-between cursor-pointer" onClick={() => handleDivClick("revenueFromKoiShop")}>
            <div>
              <h3 className="text-lg font-semibold">Revenue from Koi Shop</h3>
              <p className="text-2xl font-bold">${currentMonthData.revenueFromKoiShop.toLocaleString()}</p>
            </div>
            <div className={revenueFromKoiShopChange.className}>{revenueFromKoiShopChange.change}</div>
          </div>
          <div className="p-11 bg-white shadow-md rounded-lg flex flex-col justify-between cursor-pointer" onClick={() => handleDivClick("revenueFromCommission")}>
            <div>
              <h3 className="text-lg font-semibold">Revenue from Commission</h3>
              <p className="text-2xl font-bold">${currentMonthData.revenueFromCommission.toLocaleString()}</p>
            </div>
            <div className={revenueFromCommissionChange.className}>{revenueFromCommissionChange.change}</div>
          </div>
          <div className="p-11 bg-white shadow-md rounded-lg flex flex-col justify-between cursor-pointer" onClick={() => handleDivClick("totalCommissionOrders")}>
            <div>
              <h3 className="text-lg font-semibold">Total Commission Orders</h3>
              <p className="text-2xl font-bold">${currentMonthData.totalCommissionOrders}</p>
            </div>
            <div className={totalCommissionOrdersChange.className}>{totalCommissionOrdersChange.change}</div>
          </div>
          <div className="p-11 bg-white shadow-md rounded-lg flex flex-col justify-between cursor-pointer" onClick={() => handleDivClick("completedOrders")}>
            <div>
              <h3 className="text-lg font-semibold">Completed Orders</h3>
              <p className="text-2xl font-bold">${currentMonthData.completedOrders}</p>
            </div>
            <div className={completedOrdersChange.className}>{completedOrdersChange.change}</div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row gap-4 my-8">
        <div className="p-2 w-3/4 bg-white shadow-md rounded-lg">
          {/* <ConsignmentByMonthChart data={SAMPLE_CONSIGNMENT_BY_MONTH_DATA} /> */}
          <ConsignmentByMonthChart data={consignmentByMonth} />
        </div>
        <div className="p-2 w-1/4 bg-white shadow-md rounded-lg flex justify-center items-start">
          {/* <ConsignmentChart data={SAMPLE_CONSIGNMENT_BY_TYPE_DATA} /> */}
          <ConsignmentChart data={consignmentByType} />
        </div>
      </div>
      <div className="flex flex-row gap-4 my-8">
        <div className="p-2 w-1/2 bg-white shadow-md rounded-lg">
          <FavCustomerLineChart data={favCustomer} />
          {/* <FavCustomerLineChart data={SAMPLE_FAV_CUSTOMER_DATA} /> */}
        </div>
        <div className="p-2 w-1/2 bg-white shadow-md rounded-lg">
          {/* <RankingOriginChart data={SAMPLE_RANKING_ORIGIN_DATA} /> */}
          <RankingOriginChart data={rankingOrigin} />
        </div>
      </div>
    </ContentLayout>
  );
}

export default DashboardPage;