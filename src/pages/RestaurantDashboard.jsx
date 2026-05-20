import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const mockMenu = [
  { id: 1, name: 'Smash Burger', price: 12.99, category: 'Mains' },
  { id: 2, name: 'Truffle Fries', price: 6.99, category: 'Sides' },
  { id: 3, name: 'Vanilla Shake', price: 5.99, category: 'Drinks' },
];

const mockOrders = [
  { id: 1001, customer: 'John Doe', total: 24.98, status: 'Pending', time: '5 mins ago', items: '2x Smash Burger, 1x Truffle Fries' },
  { id: 1002, customer: 'Sarah Jenkins', total: 12.99, status: 'Pending', time: '12 mins ago', items: '1x Smash Burger' },
  { id: 1003, customer: 'Mike Ross', total: 34.50, status: 'Accepted', time: '25 mins ago', items: '3x Smash Burger, 2x Vanilla Shake' },
];

const RestaurantDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'menu'
  
  // State
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [newItem, setNewItem] = useState({ name: '', price: '', category: 'Mains' });

  useEffect(() => {
    // Simulate initial fetch from backend APIs
    setTimeout(() => {
      setMenuItems(mockMenu);
      setOrders(mockOrders);
      setLoading(false);
    }, 800);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    // Simulate PUT /api/orders/{id}/status
    console.log(`Updating order ${orderId} to ${newStatus}`);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleAddMenu = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    
    // Simulate POST /api/menu
    const newEntry = { ...newItem, id: Date.now(), price: parseFloat(newItem.price) };
    setMenuItems([...menuItems, newEntry]);
    setNewItem({ name: '', price: '', category: 'Mains' });
  };

  const handleDeleteMenu = (id) => {
    // Simulate DELETE /api/menu/{id}
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100">
      {/* Dashboard Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Food<span className="text-orange-500">Dash</span> <span className="text-xs text-orange-400 border border-orange-400 rounded px-1 ml-1">Partner</span></span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-300">Partner, {user?.email || 'Restaurant'}</span>
              <button 
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Manage Your Business</h1>
            <p className="text-gray-400 mt-2">Overview of your orders, menu, and performance.</p>
          </div>
          
          {/* Tabs */}
          <div className="bg-gray-800 p-1 rounded-xl flex border border-gray-700">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'orders' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Live Orders
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'menu' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Menu items
            </button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        ) : activeTab === 'orders' ? (
          /* ================= incoming orders panel ================= */
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Pending Orders
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.filter(o => o.status === 'Pending').map(order => (
                <div key={order.id} className="bg-gray-800 rounded-2xl border border-orange-500/50 p-6 shadow-[0_0_15px_rgba(249,115,22,0.1)] flex flex-col h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-bl-full pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-white text-lg">#{order.id}</h3>
                      <p className="text-gray-400 text-sm">{order.time}</p>
                    </div>
                    <span className="text-orange-400 font-bold text-xl">${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="mb-6 flex-grow">
                    <p className="text-gray-300 font-medium mb-2">{order.customer}</p>
                    <p className="text-gray-500 text-sm">{order.items}</p>
                  </div>
                  
                  <div className="flex gap-3 mt-auto">
                    <button 
                      onClick={() => handleStatusUpdate(order.id, 'Rejected')}
                      className="flex-1 bg-gray-700 hover:bg-red-500/20 text-gray-300 hover:text-red-400 font-bold py-2.5 rounded-xl transition-colors border border-gray-600 hover:border-red-500/50"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(order.id, 'Accepted')}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl shadow-lg transition-colors"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))}
              {orders.filter(o => o.status === 'Pending').length === 0 && (
                <p className="text-gray-500 col-span-full">No pending orders right now.</p>
              )}
            </div>

            <h2 className="text-xl font-bold text-white mb-4 mt-12">Recent History</h2>
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-900 border-b border-gray-700 text-gray-400 text-sm">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Order ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Total</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {orders.filter(o => o.status !== 'Pending').map(order => (
                    <tr key={order.id} className="hover:bg-gray-750 transition-colors text-gray-300">
                      <td className="px-6 py-4 font-medium">#{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Accepted' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ================= menu management panel ================= */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Item Form */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">Add New Item</h3>
                <form onSubmit={handleAddMenu} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Item Name</label>
                    <input 
                      required 
                      type="text" 
                      value={newItem.name}
                      onChange={e => setNewItem({...newItem, name: e.target.value})}
                      placeholder="e.g. Garlic Bread" 
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Price ($)</label>
                    <input 
                      required 
                      type="number" 
                      step="0.01" 
                      value={newItem.price}
                      onChange={e => setNewItem({...newItem, price: e.target.value})}
                      placeholder="4.99" 
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Category</label>
                    <select 
                      value={newItem.category}
                      onChange={e => setNewItem({...newItem, category: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all appearance-none"
                    >
                      <option>Mains</option>
                      <option>Sides</option>
                      <option>Drinks</option>
                      <option>Desserts</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-colors mt-6">
                    Add to Menu
                  </button>
                </form>
              </div>
            </div>

            {/* Menu Table */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-900 border-b border-gray-700 text-gray-400 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Name</th>
                      <th className="px-6 py-4 font-semibold">Category</th>
                      <th className="px-6 py-4 font-semibold">Price</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {menuItems.map(item => (
                      <tr key={item.id} className="hover:bg-gray-750 transition-colors text-gray-300 group">
                        <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                        <td className="px-6 py-4">
                          <span className="bg-gray-700 px-2.5 py-1 rounded-md text-xs font-semibold">{item.category}</span>
                        </td>
                        <td className="px-6 py-4 font-medium">${item.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-500 hover:text-white mr-4 transition-colors">Edit</button>
                          <button 
                            onClick={() => handleDeleteMenu(item.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {menuItems.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Your menu is empty. Add your first item!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantDashboard;
