import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import CartDrawer from './components/CartDrawer';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import RestaurantDashboard from './pages/RestaurantDashboard';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import PageTransition from './components/PageTransition';

const AppRoutes = () => {
  const location = useLocation();
  return (
    <PageTransition>
      <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route 
            path="/customer-dashboard" 
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/restaurant-dashboard" 
            element={
              <ProtectedRoute allowedRole="restaurant">
                <RestaurantDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/restaurant/:id" 
            element={
              <ProtectedRoute allowedRole="customer">
                <Menu />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute allowedRole="customer">
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-tracking/:id" 
            element={
              <ProtectedRoute allowedRole="customer">
                <OrderTracking />
              </ProtectedRoute>
            } 
          />

      </Routes>
    </PageTransition>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
          <CartDrawer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
