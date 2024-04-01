import { IGraphQuestion } from "types";

const buildChartData = (data: IGraphQuestion["data"]) => {
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

export { buildChartData };
