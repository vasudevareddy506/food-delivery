import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // Added a demo role selector to handle routing logic as requested (Customer vs Restaurant)
  // In a real app, this role would be returned by the authentication backend.
  const [demoRole, setDemoRole] = useState('customer'); 
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate backend authentication
      console.log('Login Successful:', formData, 'Role:', demoRole);
      
      // Set the user in global context
      login({ email: formData.email, role: demoRole });

      // Role-based routing
      if (demoRole === 'customer') {
        navigate('/customer-dashboard');
      } else if (demoRole === 'restaurant') {
        navigate('/restaurant-dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900">Food<span className="text-orange-500">Dash</span></span>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome back</h1>
          <p className="text-gray-500 mb-8 text-lg">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Demo Role Selector for Routing */}
            <div className="bg-gray-100 p-1 rounded-xl flex mb-6">
              <button
                type="button"
                onClick={() => setDemoRole('customer')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${demoRole === 'customer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Customer Login
              </button>
              <button
                type="button"
                onClick={() => setDemoRole('restaurant')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${demoRole === 'restaurant' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Restaurant Login
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-200' : 'focus:ring-orange-200 focus:border-orange-500'} transition-all`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500 font-medium">{errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">Forgot password?</a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-200' : 'focus:ring-orange-200 focus:border-orange-500'} transition-all`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-500 font-medium">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-500 hover:text-orange-600 font-bold hover:underline transition-all">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image Section (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-orange-900 opacity-80 z-10 mix-blend-multiply"></div>
        <img 
          src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Delicious pizza"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 flex flex-col justify-center p-16 text-white h-full w-full">
          <div className="mb-8 max-w-lg">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-semibold text-sm mb-6 border border-orange-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Over 500+ restaurants
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Satisfy your <br/><span className="text-orange-400">cravings</span> instantly.</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              Sign in to access your saved addresses, track ongoing orders, and reorder your favorite meals with just one click.
            </p>
            
            <div className="grid grid-cols-2 gap-6 border-t border-gray-700 pt-8">
               <div>
                  <h4 className="text-3xl font-bold text-white mb-1">2M+</h4>
                  <p className="text-gray-400 text-sm font-medium">Active Users</p>
               </div>
               <div>
                  <h4 className="text-3xl font-bold text-white mb-1">99%</h4>
                  <p className="text-gray-400 text-sm font-medium">Positive Reviews</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
