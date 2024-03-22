"use client";
import { useEffect, useMemo, useState } from "react";

import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";

import { IGraphForm } from "components/NRForm/types";

Chart.register(CategoryScale, ChartDataLabels);

type PieChartProps = {
  data: IGraphForm["data"];
};

const PieChart = ({ data }: PieChartProps) => {
  const { columns, rows } = data;
  const labels = rows.map((row) => row[columns[0].field]);

  const datasets = useMemo(
    () => [
      {
        label: columns[1].headerName,
        data: rows.map((row) => row[columns[1].field]),
      },
    ],
    [columns, rows]
  );

  useEffect(() => {
    setChartData({
      labels,
      datasets,
    });
  }, [data, columns, rows, labels, datasets]);

  const [chartData, setChartData] = useState({
    labels,
    datasets,
  });

  if (columns.length < 2 || rows.length === 0) {
    return <>No data</>;
  }

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
