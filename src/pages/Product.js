import React, { useState } from 'react';

function Product() {
  // Sample product data
  const [products, setProducts] = useState([
    { id: 1, name: 'Lavender Dreams Perfume', category: 'Perfume', stock: 3, price: 49.99, status: 'Low Stock' },
    { id: 2, name: 'Rose Gold Luxury Watch', category: 'Accessories', stock: 5, price: 199.99, status: 'Low Stock' },
    { id: 3, name: 'Classic White Shirt', category: 'Clothing', stock: 25, price: 29.99, status: 'In Stock' },
    { id: 4, name: 'Bluetooth Headphones', category: 'Electronics', stock: 50, price: 89.99, status: 'In Stock' },
  ]);

  // Hardcoded categories list (should match Categories page)
  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Perfume',
    'Accessories',
  ];

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    status: 'In Stock'
  });

  const handleAddProduct = () => {
    if (formData.name.trim() && formData.category.trim() && formData.stock && formData.price) {
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        stock: Number(formData.stock),
        price: Number(formData.price),
        status: formData.status
      };
      setProducts([...products, newProduct]);
      setFormData({ name: '', category: '', stock: '', price: '', status: 'In Stock' });
      setShowAddModal(false);
    }
  };

  const handleEditProduct = () => {
    if (editingProduct && formData.name.trim() && formData.category.trim() && formData.stock && formData.price) {
      setProducts(products.map(prod => 
        prod.id === editingProduct.id 
          ? { ...prod, name: formData.name, category: formData.category, stock: Number(formData.stock), price: Number(formData.price), status: formData.status }
          : prod
      ));
      setEditingProduct(null);
      setFormData({ name: '', category: '', stock: '', price: '', status: 'In Stock' });
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(prod => prod.id !== id));
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock,
      price: product.price,
      status: product.status
    });
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    setFormData({ name: '', category: '', stock: '', price: '', status: 'In Stock' });
  };

  return (
    <div className="flex flex-col w-full min-h-screen space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Product Management</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
          >
            <span>➕</span>
            Add Product
          </button>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">
          Manage your products and inventory efficiently.
        </p>
      </div>

      {/* Product List - Table for sm+ */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full">
        <div className="overflow-x-auto hidden sm:block">
          <table className="min-w-full text-xs sm:text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-3 font-semibold">Product Name</th>
                <th className="py-3 px-3 font-semibold">Category</th>
                <th className="py-3 px-3 font-semibold">Stock</th>
                <th className="py-3 px-3 font-semibold">Price</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium">{product.name}</td>
                  <td className="py-3 px-3 text-gray-600">{product.category}</td>
                  <td className="py-3 px-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-3">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.status === 'In Stock' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Card layout for mobile */}
        <div className="block sm:hidden space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="font-semibold text-lg text-gray-800 mb-1">{product.name}</div>
              <div className="text-gray-600 text-sm mb-2">Category: {product.category}</div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {product.stock} units
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  product.status === 'In Stock' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.status}
                </span>
              </div>
              <div className="text-gray-800 font-semibold mb-2">${product.price.toFixed(2)}</div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => openEditModal(product)}
                  className="flex-1 bg-blue-100 text-blue-700 py-1 rounded-lg font-medium text-xs hover:bg-blue-200 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="flex-1 bg-red-100 text-red-700 py-1 rounded-lg font-medium text-xs hover:bg-red-200 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter stock quantity"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={editingProduct ? handleEditProduct : handleAddProduct}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product; 