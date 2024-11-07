'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SubscriptionChartProps {
  data: any;
  title: string; // Add title prop
}

const SubscriptionChart: React.FC<SubscriptionChartProps> = ({ data, title }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: title, // Use the title prop
      },
      legend: {
        position: 'bottom' as const,
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to fill the container
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: Math.max(...data.datasets.map((d: any) => Math.max(...d.data))) + 10, // Dynamic max value
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div style={{ height: '100%', width: '100%' }}> {/* Full width and height */}
      <Bar options={options} data={data} />
    </div>
  );
};

export default SubscriptionChart;