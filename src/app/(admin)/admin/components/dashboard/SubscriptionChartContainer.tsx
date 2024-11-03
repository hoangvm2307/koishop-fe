'use client';
import React from 'react';
import SubscriptionChart from './SubscriptionChart'; // Import the chart component

interface RevenueData {
  revenueFromKoiShop: number;
  revenueFromCommission: number;
  totalCommissionOrders: number;
  completedOrders: number;
}

interface SubscriptionChartContainerProps {
  data: Record<string, RevenueData>; // Expecting an object with month keys
  chartType: 'revenueFromKoiShop' | 'revenueFromCommission' | 'totalCommissionOrders' | 'completedOrders';
}

const SubscriptionChartContainer: React.FC<SubscriptionChartContainerProps> = ({ data, chartType }) => {
  // Prepare the datasets based on the provided data
  const months = Object.keys(data);
  const chartData = {
    labels: months,
    datasets: [
      {
        label: chartType === 'revenueFromKoiShop' ? 'Revenue from Koi Shop' :
               chartType === 'revenueFromCommission' ? 'Revenue from Commission' :
               chartType === 'totalCommissionOrders' ? 'Total Commission Orders' :
               'Completed Orders',
        data: months.map(month => data[month][chartType]),
        backgroundColor: chartType === 'revenueFromKoiShop' ? 'rgb(173, 216, 230)' :
                         chartType === 'revenueFromCommission' ? 'rgb(255, 206, 86)' :
                         chartType === 'totalCommissionOrders' ? 'rgb(75, 192, 192)' :
                         'rgb(255, 99, 132)', // Different color for completed orders
      },
    ],
  };

  // Set the title based on the chart type
  const title = chartType === 'revenueFromKoiShop' ? 'Revenue from Koi Shop' :
                chartType === 'revenueFromCommission' ? 'Revenue from Commission' :
                chartType === 'totalCommissionOrders' ? 'Total Commission Orders' :
                'Completed Orders';

  return <SubscriptionChart data={chartData} title={title} />; // Pass the prepared data and title to the chart
};

export default SubscriptionChartContainer;