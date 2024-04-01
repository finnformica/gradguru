"use client";
import { useEffect, useState } from "react";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

import { IGraphQuestion } from "types";
import { buildChartData } from "./utils";

Chart.register(CategoryScale, ChartDataLabels);

type BarChartProps = {
  data: IGraphQuestion["data"];
};

const BarChart = ({ data }: BarChartProps) => {
  const { columns, rows, pivot } = data;

  const [chartData, setChartData] = useState(buildChartData(data));

  useEffect(() => {
    setChartData(buildChartData(data));
  }, [data, columns, rows, pivot]);

  if (rows.length === 0) {
    return <>No data</>;
  }

  return (
    <Bar
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
        scales: {
          x: {
            title: {
              display: true,
              text: data?.labels?.x || "",
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
