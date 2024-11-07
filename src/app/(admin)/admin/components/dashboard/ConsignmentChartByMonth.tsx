import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface ConsignmentByMonthChartProps {
  data: { date: string; totalConsignment: number }[];
}

const ConsignmentByMonthChart: React.FC<ConsignmentByMonthChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleString('default', { month: 'long', year: 'numeric' })),
    datasets: [
      {
        label: "Total Consignments",
        data: data.map(item => item.totalConsignment),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 0.6)",
        tension: 0.1,
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
        text: "Consignments by Month",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ConsignmentByMonthChart;