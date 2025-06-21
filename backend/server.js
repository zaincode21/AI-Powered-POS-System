const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const supplierRoutes = require('./routes/supplierRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/suppliers', supplierRoutes);

app.get('/', (req, res) => {
  res.send('POS Backend API is running');
});

app.listen(port, () => {
  console.log(`Server running  on port ${port}`);
}); 