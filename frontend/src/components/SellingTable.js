import React, { useState, useEffect } from 'react';

export default function SellingTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/sellingtable?search=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, [search]);

  return (
    <div className="container">
      <h2>Sell Product List</h2>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="table">
      <thead className="thead-dark">
        <tr>
            <th>Name</th>
            <th>Source</th>
            <th>MRP</th>
            <th>Quantity</th>
            <th>Rate Per Unit</th>
            <th>Expiry</th>
            <th>CGST (%)</th>
            <th>CGST Amount</th>
            <th>SGST (%)</th>
            <th>SGST Amount</th>
        </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.source}</td>
              <td>{product.mrp}</td>
              <td>{product.quantity}</td>
              <td>{product.ratePerUnit}</td>
              <td>{product.expiry}</td>
              <td>{product.cgst}</td>
              <td>{product.cgstamt}</td>
              <td>{product.sgst}</td>
              <td>{product.sgstamt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
