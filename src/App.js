// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';
import Table from './OrderTable';
import Dashboard from './Dashboard';
import MyChartComponent from './MyChartcomponent'; 
import { Bar, Pie } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";

Chart.register(CategoryScale);

function App() {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [visitorChart, setVisitorChart] = useState(null);
  const [totalUnsuccessfulOrders, setTotalUnsuccessfulOrders] = useState(0);
  const [totalunsuccessful, setTotalUnsuccessfulOrdersc] = useState(null);
  const [totalOrdersPlaced, setTotalOrdersPlaced] = useState(0);
  const [totalOrdersPlace, setTotalOrdersPlace] = useState(null);
  const [ordersPlacedData, setOrdersPlacedData] = useState([]);

  useEffect(() => {
    // Fetch data here and update state
    // Example: Fetch total visitors from totalVisitors.json
    fetch('/totalVisitors.json')
      .then(response => response.json())
      .then(data => {
        const visitorsCountByDate = {};
        let totalVisitors = 0;
        data.forEach(item => {
          totalVisitors += 1;
          const date = item.split(' ')[0];
          visitorsCountByDate[date] = (visitorsCountByDate[date] || 0) + 1;
        });
        setTotalVisitors(data.length)
        setVisitorChart(visitorsCountByDate)
      });

    // Fetch unsuccessful orders data from unsuccessfulOrders.json
    fetch('/unsuccessfulOrders.json')
      .then(response => response.json())
      .then(data => {
        const unsuccessfulCounts = {};
        let totalunsuccessful = 0;
        data.forEach(item => {
          totalunsuccessful += 1;
          unsuccessfulCounts[item.title] = (unsuccessfulCounts[item.title] || 0) + 1;
        });
        setTotalUnsuccessfulOrders(data.length);
        setTotalUnsuccessfulOrdersc(unsuccessfulCounts);
      });

    // Fetch orders placed data from ordersPlaced.json
    fetch('/ordersPlaced.json')
      .then(response => response.json())
      .then(data => {
        const ordersCountByDate = {};
        data.forEach((order) => {
          const date = order.DueDate.split(' ')[0];
          ordersCountByDate[date] = (ordersCountByDate[date] || 0) + 1;
        });

        setTotalOrdersPlaced(data.length);
        setTotalOrdersPlace(ordersCountByDate);
        setOrdersPlacedData(data);
      });
  }, []);

  const chartColors = {
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
    hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
    borderRadius: 5,
    barThickness: 48,
  };

  return (
    <div className="App">
      <h1>Dashboard</h1>
      <Dashboard />

      <Card title="Total No of Visitors" value={totalVisitors}>
        <Bar data={{
          labels: visitorChart ? Object.keys(visitorChart) : [],
          datasets: [
            {
              data: visitorChart ? Object.values(visitorChart) : [],
              ...chartColors,
            },
          ],
        }} />
      </Card>

      <Card title="Total No of Unsuccessful Orders" value={totalUnsuccessfulOrders}>
        <Pie data={{
          labels: totalunsuccessful ? Object.keys(totalunsuccessful) : [],
          datasets: [
            {
              data: totalunsuccessful ? Object.values(totalunsuccessful) : [],
              ...chartColors,
            },
          ],
        }} />
      </Card>

      <Card title="Total No of Orders placed" value={totalOrdersPlaced}>
        <Bar data={{
          labels: totalOrdersPlace ? Object.keys(totalOrdersPlace) : [],
          datasets: [
            {
              data: totalOrdersPlace ? Object.values(totalOrdersPlace) : [],
              ...chartColors,
            },
          ],
        }} />
      </Card>

      <Table data={ordersPlacedData} />
    </div>
  );
}

export default App;
