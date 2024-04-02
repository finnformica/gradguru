"use client";
import { useEffect, useState } from "react";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";

import { IGraphQuestion } from "types";
import { buildChartData } from "./utils";

Chart.register(CategoryScale, ChartDataLabels);

type LineChartProps = {
  data: IGraphQuestion["data"];
};

const LineChart = ({ data }: LineChartProps) => {
  const [chartData, setChartData] = useState(buildChartData(data));

  useEffect(() => {
    setChartData(buildChartData(data));
  }, [data]);

  if (data.rows.length === 0) {
    return <>No data</>;
  }

  return (
    <Line
      data={chartData}
      options={{
        plugins: {
          datalabels: {
            display: true,
            color: "black",
            align: "top",
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

export default LineChart;
