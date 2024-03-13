// src/Card.js
import React from 'react';



function Card({ title, value, chartData ,children}) {
  console.log("cc",children);
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
       <div className="chart-container">{children}</div>

    </div>
  );
}

export default Card;
