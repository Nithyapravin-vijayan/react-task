// MyChartComponent.js
import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

const MyChartComponent = ({ successfulData }) => {
  console.log("Successful Data:", successfulData);

  let productItemLabels = [];
  let productCounts = [];
  successfulData.forEach((item) => {
    item.ProductList.forEach((product) => {
      productItemLabels.push(product[0]);
      productCounts.push(product[2]);
    });
  });

  const chartData = {
    labels: productItemLabels,
    datasets: [
      {
        label: "Product Counts",
        data: productCounts,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return <BarChart chartData={chartData} />;
};

export default MyChartComponent;
