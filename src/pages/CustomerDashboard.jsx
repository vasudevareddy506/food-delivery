import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import RestaurantCard from '../components/RestaurantCard';

const mockRestaurants = [
  {
    id: 1,
    name: 'Smash Burger Joint',
    cuisine: 'American',
    rating: 4.8,
    deliveryTime: '20-30 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'The best smash burgers in town, served with crispy fries and our signature house-made sauce.'
  },
  {
    id: 2,
    name: 'Sushi Master',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '35-45 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Fresh, authentic sushi rolls and sashimi made daily by our master chefs with premium imported fish.'
  },
  {
    id: 3,
    name: 'Pizza Paradiso',
    cuisine: 'Italian',
    rating: 4.7,
    deliveryTime: '25-40 min',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Wood-fired Neapolitan pizzas with premium imported ingredients and fresh mozzarella.'
  },
  {
    id: 4,
    name: 'Spicy Thai',
    cuisine: 'Thai',
    rating: 4.6,
    deliveryTime: '30-40 min',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Authentic Thai curries, classic Pad Thai, and intensely flavorful spicy stir-fries.'
  },
  {
    id: 5,
    name: 'Green Bowl',
    cuisine: 'Healthy',
    rating: 4.9,
    deliveryTime: '15-25 min',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Nutritious salad bowls, cold-pressed juices, and healthy protein-packed wraps.'
  },
  {
    id: 6,
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.5,
    deliveryTime: '20-35 min',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Authentic street-style tacos, massive burritos, and fresh guacamole made to order.'
  }
];

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Dashboard Navbar */}
      <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">Food<span className="text-orange-500">Dash</span></span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600 hidden sm:block">Welcome, {user?.email || 'Customer'}</span>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-gray-600 hover:text-orange-500 transition-colors relative p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <button 
                onClick={handleLogout}
                className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Local Flavors</h1>
          <p className="text-gray-500 mt-2">Find the best restaurants near you.</p>
        </header>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
