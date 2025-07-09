import React, { useState, useEffect } from 'react';
import gsap from 'gsap'
import {toast} from 'react-toastify'
import { registerUser } from '../utils/auth';



const Signup = ({setSignUpPannel}) => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      username.trim() &&
      email.trim() &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [username, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { success , data , error } = await registerUser(username , email ,  password);

    if(success){
      localStorage.setItem('token' , data.token);
      toast.success('User registered successfully');
     setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
      console.log(data)
    }else{
      toast.error('Error registering user');
      setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    }
    setLoading(false);
    setSignUpPannel(true)
    
  };

  return (
   <div className='signUpPop fixed z-10 w-full h-screen flex bg-black/50 items-center justify-center'>
     <div className=" max-w-md mx-auto mt-30 p-6   bg-white border border-gray-300 rounded-xl shadow-lg">
      <h2 className=" font-bold text-center text-black">Signup</h2>
      <div className='flex justify-end'>
          <button onClick={()=>{setSignUpPannel(true)}} className='text-black text-lg hover:text-red-500 cursor-pointer'>X</button>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4 ">

        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-transparent placeholder:text-zinc-400 border border-gray-300 text-zinc-800  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-transparent border placeholder:text-zinc-400 border-gray-300 text-zinc-800   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-transparent placeholder:text-zinc-400 border border-gray-300 text-zinc-800  focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label>Create Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md bg-transparent placeholder:text-zinc-400 border border-gray-300 text-zinc-800   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 px-4 rounded-md text-white cursor-pointer font-semibold transition-all ${
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
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
              "Sign Up"
            )}
        </button>
      </form>
    </div>
   </div>
  );
};

export default Signup;
