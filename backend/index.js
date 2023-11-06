const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Buy = require('./models/Buy')
const Sell = require('./models/Sell')
require('dotenv').config
const app = express()
const port = 5000;

const corsOptions = {
  origin: 'https://billing-app-pyze-d4y0n07oc-satvikrajan.vercel.app',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions)); 
app.use(express.json());;
// app.use(cors())
mongoose.connect('mongodb+srv://satvikrajan:Satvik2003@cluster0.9xmm0uz.mongodb.net/billing-app?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.post('/api/products/buying', async (req, res) => {
  try {
    const newProduct = await Buy.create(req.body); 
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save buying product' });
  }
});

app.post('/api/products/selling', async (req, res) => {
  try {
    const newProduct = await Sell.create(req.body); 
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save selling product' });
  }
});

app.get('/api/products/buyingtable', async (req, res) => {
  try {
    const search = req.query.search || '';
    const products = await Buy.find({ name: { $regex: search, $options: 'i' }});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve buying products' });
  }
});

app.get('/api/products/sellingtable', async (req, res) => {
  try {
    const search = req.query.search || '';
    const products = await Sell.find({ name: { $regex: search, $options: 'i' }});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve selling products' });
  }
});
app.get('/api/products/getcgstsgst', async (req, res) => {
  const { name, mode } = req.query;
  try {
    if (!name || !mode) {
      return res.status(400).json({ error: 'Name and mode are required' });
    }
    const tableName = mode === 'buy' ? 'Buy' : 'Sell';

    const product = await mongoose.model(tableName).findOne({ name });

    if (product) {
      const { cgst, sgst } = product;
      res.json({ cgst, sgst });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`);
});
