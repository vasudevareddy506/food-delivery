import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Rating Badge Overlay */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
          <svg className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span className="text-sm font-bold text-gray-900">{restaurant.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{restaurant.name}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-orange-50 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-md">
            {restaurant.cuisine}
          </span>
          <span className="text-gray-500 text-sm flex items-center gap-1 font-medium">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {restaurant.deliveryTime}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
          {restaurant.description}
        </p>

        {/* View Menu Button */}
        <Link 
          to={`/restaurant/${restaurant.id}`} 
          className="block w-full text-center bg-gray-50 hover:bg-orange-500 text-gray-900 hover:text-white font-bold py-3.5 px-4 rounded-xl transition-colors duration-300 border border-gray-100 hover:border-orange-500 shadow-sm"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
