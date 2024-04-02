"use client";
import { useEffect, useState } from "react";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

import { IGraphQuestion } from "types";

Chart.register(CategoryScale, ChartDataLabels);

type PieChartProps = {
  data: IGraphQuestion["data"];
};

const buildChartData = (data: IGraphQuestion["data"]) => {
  const { columns, rows } = data;
  const labels = rows.map((row) => row[columns[0].field]);

  const datasets = [
    {
      label: columns[1].headerName,
      data: rows.map((row) => row[columns[1].field]),
    },
  ];

  return {
    labels,
    datasets,
  };
};

const PieChart = ({ data }: PieChartProps) => {
  const { columns, rows } = data;

  const [chartData, setChartData] = useState(buildChartData(data));

  useEffect(() => {
    setChartData(buildChartData(data));
  }, [data]);

  if (columns.length < 2 || rows.length === 0) {
    return <>No data</>;
  }

  return (
    <Pie
      data={chartData}
      options={{
        animation: false,
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
