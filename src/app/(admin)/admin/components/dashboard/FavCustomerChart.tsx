import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface FavCustomerBarChartProps {
  data: { totalOrders: number; userId: number }[];
}

const FavCustomerBarChart: React.FC<FavCustomerBarChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => `User ${item.userId}`),
    datasets: [
      {
        label: "Total Orders",
        data: data.map(item => item.totalOrders),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Favorite Customers - Total Orders",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default FavCustomerBarChart;