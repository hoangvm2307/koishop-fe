import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ConsignmentChartProps {
  data: {
    totalConsignmentOnline: number;
    totalConsignmentOffline: number;
  };
}

const ConsignmentChart: React.FC<ConsignmentChartProps> = ({ data }) => {
  const chartData = {
    labels: ["Online Consignments", "Offline Consignments"],
    datasets: [
      {
        label: "Total Consignments",
        data: [data.totalConsignmentOnline, data.totalConsignmentOffline],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)"
        ],
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
        text: "Consignment by Type",
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default ConsignmentChart;