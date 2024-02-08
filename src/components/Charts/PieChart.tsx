"use client";
import { useState, useEffect } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { IGraphForm } from "@/components/NRForm/types";

Chart.register(CategoryScale, ChartDataLabels);

type PieChartProps = {
  data: IGraphForm["data"];
};

const PieChart = ({ data }: PieChartProps) => {
  const { columns, rows } = data;
  if (columns.length !== 2 || rows.length === 0) {
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
    <Pie
      data={chartData}
      options={{
        plugins: {
          datalabels: {
            display: true,
            color: "black",
          },
          title: {
            display: true,
            text: data?.labels?.title || "",
          },
        },
      }}
    />
  );
};

export default PieChart;
