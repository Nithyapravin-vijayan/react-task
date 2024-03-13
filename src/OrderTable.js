import React from 'react';

function OrderTable({ data }) {
  if (!Array.isArray(data)) {
    console.error("Invalid data format. Expected an array.");
    return null; // or handle the error in a way that makes sense for your application
  }

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Company Name</th>
          <th>Due Date</th>
          <th>Address</th>
          <th>Postal Code</th>
          <th>Country</th>
          <th>Number</th>
          <th>User Mail</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order, index) => (
          <React.Fragment key={index}>
            {order.ProductList.map((product, subIndex) => (
              <tr key={`${index}-${subIndex}`}>
                <td>{order.Fname}</td>
                <td>{order.Lname}</td>
                <td>{order.CompanyName}</td>
                <td>{order.DueDate}</td>
                <td>{order.Address1} {order.Address2}</td>
                <td>{order.PostalCode}</td>
                <td>{order.Country}</td>
                <td>{order.Number}</td>
                <td>{order.UserMail}</td>
                <td>{product[0]}</td>
                <td>{product[1]}</td>
                <td>{product[2]}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
