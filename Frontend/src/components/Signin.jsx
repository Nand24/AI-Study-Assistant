import React, { useState, useEffect } from 'react';
import gsap from 'gsap'
import { loginUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signin = ({ setSignInPannel}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const { success, data, error } = await loginUser(email, password);

    if (success) {
      localStorage.setItem('token', data.token);
      toast.success('User login successfully');
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } else {
      toast.error('Error login user');
      console.log(error);
    }

    setLoading(false); // Stop loading
    setSignInPannel(true);
  };

  return (
    <div className='signInPop fixed z-10 w-full h-screen flex bg-black/50 items-center justify-center'>
      <div className="max-w-md mx-auto mt-30 p-6 bg-white border border-gray-300 rounded-xl shadow-lg">
        <h2 className="font-bold text-center text-black">Signup</h2>
        <div className='flex justify-end'>
          <button onClick={() => setSignInPannel(true)} className='text-black text-lg hover:text-red-500 cursor-pointer'>X</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-transparent border placeholder:text-zinc-400 border-gray-300 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-transparent placeholder:text-zinc-400 border border-gray-300 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 cursor-pointer rounded-md text-white font-semibold transition-all ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
