const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
    name: { type: String, required: true },
    source: { type: String, required: true },
    mrp: { type: Number, required: true },
    quantity: { type: Number, required: true },
    ratePerUnit: { type: Number, required: true },
    expiry: { type: Date, required: true },
    cgst: { type: Number, required: true },
    cgstamt: { type: Number, required: true },
    sgst: { type: Number, required: true },
    sgstamt: { type: Number, required: true },
  
});

const Sell = mongoose.model('Sell', sellSchema);

module.exports = Sell;
