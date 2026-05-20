import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Customer'
  });
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
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with registration simulation
      console.log('Registration Successful:', formData);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-gray-900">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        {/* Decorative background blob */}
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-[400px] h-[400px] bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

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

          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Create an account</h1>
          <p className="text-gray-500 mb-8 text-lg">Join FoodDash to start your culinary journey.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} focus:outline-none focus:ring-2 ${errors.fullName ? 'focus:ring-red-200' : 'focus:ring-orange-200 focus:border-orange-500'} transition-all`}
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-500 font-medium">{errors.fullName}</p>}
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">I am a...</label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 appearance-none transition-all cursor-pointer font-medium text-gray-700"
                >
                  <option value="Customer">Hungry Customer</option>
                  <option value="Restaurant">Restaurant Owner</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{' '}
            {/* Link to login page */}
            <Link to="/login" className="text-orange-500 hover:text-orange-600 font-bold hover:underline transition-all">
              Log in instead
            </Link>
          </p>
        </div>
      </div>

      {/* Right Image Section (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-500 opacity-90 z-10 mix-blend-multiply"></div>
        <img 
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="Delicious food preparation"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 flex flex-col justify-end p-16 text-white h-full w-full">
          <div className="mb-8">
            <span className="inline-block p-3 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </span>
            <h2 className="text-4xl font-bold mb-4 leading-tight">Your favorite local <br/>restaurants, delivered.</h2>
            <p className="text-orange-50 text-lg opacity-90 max-w-md leading-relaxed">
              Join thousands of food lovers and top-rated restaurants on FoodDash today. Fast delivery, fresh food.
            </p>
          </div>
          
          {/* Testimonial snippet */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl inline-block max-w-sm">
            <div className="flex items-center gap-4 mb-3">
              <img src="https://i.pravatar.cc/100?img=47" alt="User" className="w-12 h-12 rounded-full border-2 border-white/50" />
              <div>
                <h4 className="font-bold text-white">Sarah Jenkins</h4>
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
              </div>
            </div>
            <p className="text-white/90 italic">"FoodDash completely changed how I order food. It's always hot and on time!"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
