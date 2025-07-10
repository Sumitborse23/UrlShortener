import React, { useState, useEffect } from 'react';
import { loginUser } from '../apis/user.api.js';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js' 
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const auth = useSelector ((state) => state.auth);
  const dispatch = useDispatch();
  console.log(auth);

  

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(email, password);
      dispatch(login(data.user))
      navigate({to:"/dashboard"})
      setLoading(false);
      console.log('Login successful');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  
return (
    <div className="w-full max-w-md mx-auto">
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>

        {error && (
          <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md'>
            {error}
          </div>
        )}

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
         </div>

         <div className='flex items-center justify-between'>
           <button
             type="submit"
             disabled={loading}
             onClick={handleSubmit}
             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
           >
             {loading ? 'Signing in...' : 'Sign In'}
           </button>
         </div>

          <div className='text-center'>
            <p className='cursor-pointer text-gray-600 text-sm'>
              Don't have an account? <span onClick={() => state(false) } className='relative text-blue-500 after:absolute after:left-1/2 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-blue-500 after:transition-all after:duration-350 after:translate-x-[-50%] hover:after:w-full'>Register</span>
            </p>
          </div>
      </div>
    </div>
  );
}

export default LoginForm;
  