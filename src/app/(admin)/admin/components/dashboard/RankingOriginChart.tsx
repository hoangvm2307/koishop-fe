import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface RankingOriginChartProps {
  data: { totalFish: number; originName: string }[];
}

const RankingOriginChart: React.FC<RankingOriginChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.originName),
    datasets: [
      {
        label: "Total Fish",
        data: data.map(item => item.totalFish),
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
        text: "Ranking Origin - Total Fish",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default RankingOriginChart;