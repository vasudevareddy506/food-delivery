import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock data representing a restaurant profile
const mockRestaurantData = {
  1: { name: 'Smash Burger Joint', cuisine: 'American', rating: 4.8, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80' },
  2: { name: 'Sushi Master', cuisine: 'Japanese', rating: 4.9, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80' },
  // fallback for others
};

// Mock menu items
const mockMenuItems = [
  { 
    id: 101, 
    name: 'Classic Smash Burger', 
    description: 'Double beef patty, American cheese, caramelized onions, house sauce on a toasted brioche bun.', 
    price: 12.99, 
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 102, 
    name: 'Truffle Parmesan Fries', 
    description: 'Crispy shoestring fries tossed in white truffle oil, fresh parsley, and grated parmesan cheese.', 
    price: 6.99, 
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 103, 
    name: 'Spicy Chicken Sandwich', 
    description: 'Buttermilk fried chicken breast, spicy slaw, pickles, and spicy mayo.', 
    price: 13.50, 
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 104, 
    name: 'Vanilla Bean Shake', 
    description: 'Hand-spun milkshake made with real Madagascar vanilla bean ice cream.', 
    price: 5.99, 
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75bb8ef?auto=format&fit=crop&w=400&q=80' 
  },
];

import { useCart } from '../context/CartContext';

const Menu = () => {
  const { id } = useParams();
  const { addToCart, itemCount, setIsCartOpen } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch based on restaurant ID
    setTimeout(() => {
      setRestaurant(mockRestaurantData[id] || { name: 'Delicious Eats', cuisine: 'Various', rating: 4.5, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80' });
      setMenu(mockMenuItems);
      setLoading(false);
    }, 600); // simulate network delay
  }, [id]);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Restaurant Header Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex items-end justify-between w-full">
              <div className="flex-1">
                <Link to="/customer-dashboard" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                  Back to Dashboard
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{restaurant.name}</h1>
                <div className="flex items-center gap-3">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {restaurant.cuisine}
                  </span>
                  <span className="flex items-center text-white font-medium">
                    <svg className="w-5 h-5 text-yellow-400 mr-1 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {restaurant.rating} Rating
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full transition-colors relative shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Full Menu</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {menu.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row gap-4 group">
              {/* Item Info */}
              <div className="flex-1 flex flex-col justify-between order-2 sm:order-1">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white px-4 py-2 rounded-xl font-bold transition-colors shadow-sm flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Add
                  </button>
                </div>
              </div>
              
              {/* Item Image */}
              <div className="w-full sm:w-32 sm:h-32 rounded-xl overflow-hidden order-1 sm:order-2 shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
