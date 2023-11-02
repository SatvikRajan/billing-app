import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Buying() {
  const [product, setProduct] = useState({
    name: '',
    source: '',
    mrp: '',
    quantity: '',
    ratePerUnit: '',
    cgst:'',
    cgstamt: '',
    sgst: '',
    sgstamt: '',
    expiry:''
  });

  const [mode, setMode] = useState('buy');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleNameChange = (e) => {
    const { value } = e.target;
    setProduct({ ...product, name: value });
  };
  
  const handleNameBlur = () => {
    if (product.name) {
      fetch(`https://billing-app-murex.vercel.app/api/products/getcgstsgst?name=${product.name}&mode=${mode}`)
        .then((response) => response.json())
        .then((data) => {
          const { cgst, sgst } = data;
          setProduct({ ...product, cgst, sgst });
        })
        .catch((error) => {
          console.error('Error fetching CGST and SGST:', error);
        });
    }
  };
    const handleSave = () => {
      if (
      product.name.trim() === '' ||
      product.source.trim() === '' ||
      product.mrp.trim() === '' ||
      product.quantity.trim() === '' ||
      product.ratePerUnit.trim() === '' || 
      product.expiry.trim() === '' ||
      product.sgst.trim() === '' ||
      product.sgstamt.trim() === '' ||
      product.cgst.trim() === '' ||
      product.cgstamt.trim() === '' 
      ) {
        toast.error('Please fill in all fields');
      } else {
        const tableName = mode === 'buy' ? 'buying' : 'selling';
        fetch(`https://billing-app-murex.vercel.app/api/products/${tableName}`, {
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      .then((response) => response.json())
      .then((data) => {
        toast.success('Product saved successfully');
        setProduct({
          name: '',
          source: '',
          mrp: '',
          quantity: '',
          ratePerUnit: '',
          cgst: '',
          cgstamt: '',
          sgst: '',
          sgstamt: '',
          expiry: ''
        });
      });
    }
  };
  return (
    <div className="container">
      <h2>{mode === 'buy' ? 'Details for Buying Product' : 'Details for Selling Product'}</h2>
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select From these
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" onClick={() => setMode('buy')}>
              Buy
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => setMode('sell')}>
              Sell
            </button>
          </li>
        </ul>
      </div>
      <form>
        <input
          style={{margin: 10}}
          className="form-control"
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
        />
        <input
          style={{margin: 10}}
          className="form-control"
          type="text"
          name="source"
          placeholder="Source"
          value={product.source}
          onChange={handleChange}
        />
        <input
          style={{margin: 10}}
          className="form-control"
          type="number"
          name="mrp"
          placeholder="MRP"
          value={product.mrp}
          onChange={handleChange}
        />
        <input
          style={{margin: 10}}
          className="form-control"
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        <input
          style={{margin: 10}}
          className="form-control"
          type="number"
          name="ratePerUnit"
          placeholder="Rate Per Unit"
          value={product.ratePerUnit}
          onChange={handleChange}
        />
        <input
          style={{margin: 10}}
          className="form-control"
          type="date"
          name="expiry"
          placeholder="Expiry"
          value={product.expiry}
          onChange={handleChange}
        />
        <input
          style={{margin: 10}}
          className="form-control"
          type="number"
          name="cgst"
          placeholder="Cgst"
          value={product.cgst}
          onChange={handleChange}
        />
        <input
          style={{margin: 10}}
          className="form-control"
          type="number"
          name="cgstamt"
          placeholder="Cgstamt"
          value={product.cgstamt}
          onChange={handleChange}
        />
        <input
          style={{margin: 10}}
          className="form-control"
          type="number"
          name="sgst"
          placeholder="Sgst"
          value={product.sgst}
          onChange={handleChange}
        />
        <input
          style={{margin: 10}}
          className="form-control"
          type="number"
          name="sgstamt"
          placeholder="SgstAmt"
          value={product.sgstamt}
          onChange={handleChange}
        />
        <button className="btn btn-outline-secondary" style={{marginLeft: 10}} type="button" onClick={handleSave}>
          Save
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
