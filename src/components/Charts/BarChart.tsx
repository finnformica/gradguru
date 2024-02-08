"use client";
import { useState, useEffect } from "react";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { DataType } from "@/components/NRForm/types";

Chart.register(CategoryScale, ChartDataLabels);

type BarChartProps = {
  data: DataType;
};

const buildChartData = (data: BarChartProps["data"]) => {
  const { columns, rows, pivot } = data;

  if (pivot) {
    const labels = columns
      .slice(1, columns.length)
      .map((column) => column.headerName);
    const datasets = rows.map((row) => {
      return {
        label: row[columns[0].field],
        data: columns
          .slice(1, columns.length)
          .map((column) => row[column.field]),
      };
    });

    return {
      labels,
      datasets,
    };
  } else {
    const labels = rows.map((row) => row[columns[0].field]);
    const datasets = columns.slice(1, columns.length).map((column, index) => {
      return {
        label: column.headerName,
        data: rows.map((row) => row[column.field]),
      };
    });

    return {
      labels,
      datasets,
    };
  }
};

const BarChart = ({ data }: BarChartProps) => {
  const { columns, rows, pivot } = data;
  if (rows.length === 0) {
    return <>No data</>;
  }

  const [chartData, setChartData] = useState(buildChartData(data));

  useEffect(() => {
    setChartData(buildChartData(data));
  }, [data, columns, rows, pivot]);

  return (
    <Bar
      data={chartData}
      options={{
        plugins: {
          datalabels: {
            display: true,
            color: "black",
          },
        },
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
              text: data?.labels?.y || "",
            },
          },
        },
      }}
    />
  );
};

export default BarChart;
