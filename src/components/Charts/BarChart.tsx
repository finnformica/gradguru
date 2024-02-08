"use client";
import { useState, useEffect } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";

import { Data } from "./data";

Chart.register(CategoryScale);

type BarChartProps = {
  data: {
    rows: any[];
    columns: any[];
  };
};

const BarChart = ({ data }: BarChartProps) => {
  const { columns, rows } = data;
  if (rows.length === 0) {
    return <>No data</>;
  }
  const labels = rows.map((row) => row[columns[0].field]);
  const datasets = [
    {
      label: columns[1].headerName,
      data: rows.map((row) => row[columns[1].field]),
    },
  ];

  useEffect(() => {
    setChartData({
      labels,
      datasets,
    });
  }, [data, columns, rows]);

  const [chartData, setChartData] = useState({
    labels,
    datasets,
  });

  return (
    <Bar
      data={chartData}
      options={{
        scales: {
          x: {
            title: {
              display: true,
              text: columns[0].headerName,
            },
          },
          y: {
            title: {
              display: true,
              text: columns[1].headerName,
            },
          },
        },
      }}
    />
  );
};

export default BarChart;
