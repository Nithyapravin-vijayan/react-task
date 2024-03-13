
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);

  // Function to fetch JSON data
  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  // Function to parse and process the data for creating charts
  const processChartData = (visitorsData, successfulData, unsuccessfulData) => {
    // Extracting product titles from the unsuccessfulData
    // Count the occurrences of each product in the successful orders
    let productItemLabels = [];
    let productCounts = [];
    let totalCount = 0;
    successfulData.forEach(item => {
      item.ProductList.forEach(product => {
        productItemLabels.push(product[0]);
        productCounts.push(product[2]);
      });
    });

    productCounts.forEach(item => {
      totalCount += item;
    });

    // Count the occurrences of each product in the unsuccessful orders
    const unsuccessfulCounts = {};
    let totalunsuccessful = 0;

    unsuccessfulData.forEach(item => {
      totalunsuccessful += 1;
      unsuccessfulCounts[item.title] = (unsuccessfulCounts[item.title] || 0) + 1;
    });

    // Count the number of visitors on each date
    const visitorsCountByDate = {};
    let totalVisitors = 0;
    visitorsData.forEach(item => {
      totalVisitors += 1;
      const date = item.split(' ')[0];
      visitorsCountByDate[date] = (visitorsCountByDate[date] || 0) + 1;
    });

    return {
      totalCount,
      totalunsuccessful,
      totalVisitors,
    };
  };

  useEffect(() => {
    console.log("ddd");
    Promise.all([
      fetchData('ordersPlaced.json'),
      fetchData('unsuccessfulOrders.json'),
      fetchData('totalVisitors.json'),
    ]).then(([successfulData, unsuccessfulData, visitorsData]) => {
      const {
        successfulChartData,
        unsuccessfulChartData,
        visitorsChartData,
        totalCount,
        totalunsuccessful,
        totalVisitors,
      } = processChartData(visitorsData, successfulData, unsuccessfulData);


console.log("yyy",visitorsData, successfulData, unsuccessfulData);


      setChartData({
        successfulChartData,
        unsuccessfulChartData,
        visitorsChartData,
        totalCount,
        totalunsuccessful,
        totalVisitors,
      });
    }).catch(error => console.error('Error loading JSON files:', error));
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="Dashboard">
      {chartData && (
        <>
          <Card title="Total Products" value={chartData.totalCount} />
          <Card title="Unsuccessful Orders" value={chartData.totalunsuccessful} chartData={chartData.unsuccessfulChartData} />
          <Card title="Total Visitors" value={chartData.totalVisitors} chartData={chartData.visitorsChartData} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
