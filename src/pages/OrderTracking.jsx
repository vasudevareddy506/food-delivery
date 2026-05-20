import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const STAGES = [
  { id: 'placed', label: 'Order Placed', time: '12:00 PM' },
  { id: 'preparing', label: 'Preparing', time: '12:05 PM' },
  { id: 'delivering', label: 'Out for Delivery', time: '12:20 PM' },
  { id: 'delivered', label: 'Delivered', time: '12:35 PM' }
];

const OrderTracking = () => {
  const { id } = useParams();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(35);

  // Mock real-time updates for demonstration purposes
  useEffect(() => {
    if (currentStageIndex >= STAGES.length - 1) return;

    const timer = setInterval(() => {
      setCurrentStageIndex(prev => {
        const next = prev + 1;
        if (next === 1) setEstimatedTime(30);
        if (next === 2) setEstimatedTime(15);
        if (next === 3) setEstimatedTime(0);
        return next;
      });
    }, 5000); // Progresses every 5 seconds for demo

    return () => clearInterval(timer);
  }, [currentStageIndex]);

  const currentStage = STAGES[currentStageIndex];
  const progressPercentage = (currentStageIndex / (STAGES.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Track Order #{id}</h1>
            <p className="text-gray-500 mt-1">From Smash Burger Joint</p>
          </div>
          <Link to="/customer-dashboard" className="text-gray-400 hover:text-gray-900 bg-white p-2 rounded-full border border-gray-200 shadow-sm transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* Estimated Time Banner */}
          <div className="bg-gray-900 text-white p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            
            <h2 className="text-xl font-medium text-gray-400 mb-2">Estimated Arrival</h2>
            {estimatedTime > 0 ? (
              <div className="text-5xl font-extrabold mb-2">{estimatedTime} <span className="text-2xl font-bold text-gray-400">mins</span></div>
            ) : (
              <div className="text-5xl font-extrabold text-green-400 mb-2">Arrived!</div>
            )}
            <p className="text-orange-400 font-bold">{currentStage.label}</p>
          </div>

          {/* Progress Tracker */}
          <div className="p-8">
            <div className="relative">
              {/* Progress Bar Background */}
              <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-100 -translate-y-1/2 rounded-full"></div>
              {/* Active Progress Bar */}
              <div 
                className="absolute top-1/2 left-0 h-1.5 bg-orange-500 -translate-y-1/2 rounded-full transition-all duration-1000 ease-in-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
              
              {/* Stages */}
              <div className="relative flex justify-between">
                {STAGES.map((stage, index) => {
                  const isCompleted = index <= currentStageIndex;
                  const isActive = index === currentStageIndex;
                  
                  return (
                    <div key={stage.id} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-colors duration-500 ${isCompleted ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-white border-2 border-gray-200 text-gray-300'}`}>
                        {isCompleted ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
                        )}
                        
                        {/* Ping effect for active stage */}
                        {isActive && currentStageIndex !== STAGES.length - 1 && (
                          <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-50 animate-ping"></span>
                        )}
                      </div>
                      <div className="mt-3 text-center w-24">
                        <p className={`text-sm font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{stage.label}</p>
                        <p className={`text-xs mt-1 ${isCompleted ? 'text-gray-500' : 'text-gray-300'}`}>{stage.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Order Details</h3>
          
          <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex justify-between items-center text-gray-600">
              <span className="font-medium">1x Classic Smash Burger</span>
              <span className="font-medium text-gray-900">$12.99</span>
            </div>
            <div className="flex justify-between items-center text-gray-600">
              <span className="font-medium">1x Truffle Parmesan Fries</span>
              <span className="font-medium text-gray-900">$6.99</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>$19.98</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-3">
              <span>Total Paid</span>
              <span>$22.97</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderTracking;
