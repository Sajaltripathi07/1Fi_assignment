require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productsRouter = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use('/api/products', productsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
