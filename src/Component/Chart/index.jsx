import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

const ChartComponent = ({data}) => {
  const datas = {
    labels: data.labels,
    datasets: [
      {
        label: 'Doanh thu',
        data: data.revenues,
        color: '#fff',
        backgroundColor: '#7cfff3',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white', // Customize the font color for y-axis labels
        },
      },
      x:{
        ticks: {
          color: 'white', // Customize the font color for y-axis labels
        },
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#7cfff3', // Customize the font color for legend labels
        },
      },
      title: {
        display: true,
        text: 'DOANH THU THEO THÁNG',
        color: '#fff', // Customize the font color for the chart title
      }
    },
  };

  return <Bar data={datas} options={options} />;
};

export default ChartComponent;
