import React, { useState, useEffect } from 'react';

export default function BuyingTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('buy');

  useEffect(() => {
    fetch(`https://billing-app-murex.vercel.app/api/products/buyingtable?search=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, [search]);

  return (
    <div className='container'>
      <h2>Buy Product List</h2>
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
              <td>{mode === 'buy' ? product.name : product.sellName}</td>
              <td>{mode === 'buy' ? product.source : product.sellSource}</td>
              <td>{mode === 'buy' ? product.mrp : product.sellMrp}</td>
              <td>{mode === 'buy' ? product.quantity : product.sellQuantity}</td>
              <td>{mode === 'buy' ? product.ratePerUnit : product.sellRatePerUnit}</td>
              <td>{mode === 'buy' ? product.expiry : product.sellExpiry}</td>
              <td>{mode === 'buy' ? product.cgst : product.sellCgst}</td>
              <td>{mode === 'buy' ? product.cgstamt :product.sellCgstamt}</td>
              <td>{mode === 'buy' ? product.sgst :product.sellSgst}</td>
              <td>{mode === 'buy' ? product.sgstamt:product.sellSgstamt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
