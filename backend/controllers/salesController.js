const salesModel = require('../models/salesModel');

// Get all sales
async function getAllSales(req, res) {
  try {
    const sales = await salesModel.getAllSales();
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
}

// Get a sale by ID
async function getSaleById(req, res) {
  try {
    const sale = await salesModel.getSaleById(req.params.id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sale' });
  }
}

// Create a new sale
async function createSale(req, res) {
  try {
    const newSale = await salesModel.createSale(req.body);
    res.status(201).json(newSale);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sale' });
  }
}

// Update a sale
async function updateSale(req, res) {
  try {
    const updated = await salesModel.updateSale(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Sale not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update sale' });
  }
}

// Delete a sale
async function deleteSale(req, res) {
  try {
    await salesModel.deleteSale(req.params.id);
    res.json({ message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete sale' });
  }
}

// Fetch a sale with all its items by sale ID
async function getSaleWithItems(req, res) {
  try {
    const id = req.params.id;
    // Basic UUID validation
    if (!/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/.test(id)) {
      return res.status(400).json({ error: 'Invalid sale ID format' });
    }
    const sale = await salesModel.getSaleWithItemsById(id);
    if (!sale) return res.status(404).json({ error: 'Sale not found' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sale with items' });
  }
}

// Create a sale and its items in one request
async function createSaleWithItems(req, res) {
  try {
    const { sale, items } = req.body;
    if (!sale || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Sale and items are required' });
    }
    // Optionally, add more validation here (e.g., check required sale/item fields)
    const createdSale = await salesModel.createSaleWithItems(sale, items);
    res.status(201).json(createdSale);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sale with items', details: err.message });
  }
}

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
  getSaleWithItems,
  createSaleWithItems,
};

// Example usage of authentication middleware:
// const { authenticateToken } = require('../middleware/authMiddleware');
// router.get('/with-items/:id', authenticateToken, salesController.getSaleWithItems); 