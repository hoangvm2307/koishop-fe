'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Add PointElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Register PointElement
  Title,
  Tooltip,
  Legend
);

interface SubscriptionChartProps {
  data: any;
  title: string;
}

const SubscriptionChart: React.FC<SubscriptionChartProps> = ({ data, title }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        position: 'bottom' as const,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: Math.max(...data.datasets.map((d: any) => Math.max(...d.data))) + 10,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default SubscriptionChart;