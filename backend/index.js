const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); // 👈 import cors
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;
const EmployeeRouter = require('./Routes/EmployeeRoute');

// Enable CORS for React frontend
app.use(cors({
  origin: 'http://localhost:5173', // allow frontend dev server
  credentials: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Employee management system');
});

app.use('/api/employees', EmployeeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
