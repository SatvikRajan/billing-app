import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuyingTable from './components/BuyingTable';
import Products from './components/Products';
import SellingTable from './components/SellingTable';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route path="/products/buying" element={<BuyingTable />} />
          <Route path="/products/selling" element={<SellingTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
