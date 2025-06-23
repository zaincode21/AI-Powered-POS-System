import React, { useState, useEffect } from 'react';

function SaleItems() {
  // Sample sale items data (replace with API later)
  const [saleItems, setSaleItems] = useState([
    {
      id: 1,
      product_name: 'Lavender Dreams Perfume',
      quantity: 2,
      unit_price: 49.99,
      total_price: 99.98,
      discount_amount: 5.00,
    },
    {
      id: 2,
      product_name: 'Classic White Shirt',
      quantity: 1,
      unit_price: 29.99,
      total_price: 29.99,
      discount_amount: 0.00,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    product_name: '',
    quantity: '',
    unit_price: '',
    discount_amount: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleAddItem = () => {
    if (formData.product_name.trim() && formData.quantity && formData.unit_price) {
      setLoading(true);
      try {
        const newItem = {
          ...formData,
          id: Date.now(),
          quantity: Number(formData.quantity),
          unit_price: Number(formData.unit_price),
          discount_amount: formData.discount_amount ? Number(formData.discount_amount) : 0,
          total_price: Number(formData.quantity) * Number(formData.unit_price) - (formData.discount_amount ? Number(formData.discount_amount) : 0),
        };
        setSaleItems([...saleItems, newItem]);
        setFormData({ product_name: '', quantity: '', unit_price: '', discount_amount: '' });
        setShowAddModal(false);
        setMessage('Sale item added successfully!');
        setMessageType('success');
      } catch {
        setMessage('Failed to add sale item');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditItem = () => {
    if (editingItem && formData.product_name.trim() && formData.quantity && formData.unit_price) {
      setLoading(true);
      try {
        setSaleItems(saleItems.map(item =>
          item.id === editingItem.id
            ? {
                ...formData,
                id: item.id,
                quantity: Number(formData.quantity),
                unit_price: Number(formData.unit_price),
                discount_amount: formData.discount_amount ? Number(formData.discount_amount) : 0,
                total_price: Number(formData.quantity) * Number(formData.unit_price) - (formData.discount_amount ? Number(formData.discount_amount) : 0),
              }
            : item
        ));
        setEditingItem(null);
        setFormData({ product_name: '', quantity: '', unit_price: '', discount_amount: '' });
        setMessage('Sale item updated successfully!');
        setMessageType('success');
      } catch {
        setMessage('Failed to update sale item');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this sale item?')) {
      setLoading(true);
      try {
        setSaleItems(saleItems.filter(item => item.id !== id));
        setMessage('Sale item deleted successfully!');
        setMessageType('success');
      } catch {
        setMessage('Failed to delete sale item');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      discount_amount: item.discount_amount,
    });
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingItem(null);
    setFormData({ product_name: '', quantity: '', unit_price: '', discount_amount: '' });
  };

  return (
    <div className="flex flex-col w-full min-h-screen space-y-4 sm:space-y-6">
      {/* Feedback Message */}
      {message && (
        <div className={`mb-4 p-3 rounded ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      {/* Header */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Sale Items Management</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
          >
            <span>➕</span>
            Add Sale Item
          </button>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">
          Manage sale items and their details.
        </p>
      </div>
      {/* Sale Items List - Table for sm+ */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full">
        <div className="overflow-x-auto hidden sm:block">
          <table className="min-w-full text-xs sm:text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-3 font-semibold">Product Name</th>
                <th className="py-3 px-3 font-semibold">Quantity</th>
                <th className="py-3 px-3 font-semibold">Unit Price</th>
                <th className="py-3 px-3 font-semibold">Total Price</th>
                <th className="py-3 px-3 font-semibold">Discount</th>
                <th className="py-3 px-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {saleItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium">{item.product_name}</td>
                  <td className="py-3 px-3">{item.quantity}</td>
                  <td className="py-3 px-3">${item.unit_price != null ? Number(item.unit_price).toFixed(2) : '-'}</td>
                  <td className="py-3 px-3">${item.total_price != null ? Number(item.total_price).toFixed(2) : '-'}</td>
                  <td className="py-3 px-3">${item.discount_amount != null ? Number(item.discount_amount).toFixed(2) : '-'}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
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
          {saleItems.map((item) => (
            <div key={item.id} className="border rounded-xl p-4 shadow-sm bg-white">
              <div className="font-semibold text-lg text-gray-800 mb-1">{item.product_name}</div>
              <div className="text-gray-600 text-sm mb-1">Quantity: {item.quantity}</div>
              <div className="text-gray-600 text-sm mb-1">Unit Price: ${item.unit_price != null ? Number(item.unit_price).toFixed(2) : '-'}</div>
              <div className="text-gray-600 text-sm mb-1">Total Price: ${item.total_price != null ? Number(item.total_price).toFixed(2) : '-'}</div>
              <div className="text-gray-600 text-sm mb-1">Discount: ${item.discount_amount != null ? Number(item.discount_amount).toFixed(2) : '-'}</div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="flex-1 bg-blue-100 text-blue-700 py-1 rounded-lg font-medium text-xs hover:bg-blue-200 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
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
      {(showAddModal || editingItem) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? 'Edit Sale Item' : 'Add New Sale Item'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.product_name}
                  onChange={(e) => setFormData({...formData, product_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter quantity"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit Price *
                </label>
                <input
                  type="number"
                  value={formData.unit_price}
                  onChange={(e) => setFormData({...formData, unit_price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter unit price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount
                </label>
                <input
                  type="number"
                  value={formData.discount_amount}
                  onChange={(e) => setFormData({...formData, discount_amount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter discount amount"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={editingItem ? handleEditItem : handleAddItem}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition"
              >
                {editingItem ? 'Update Sale Item' : 'Add Sale Item'}
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

export default SaleItems; 