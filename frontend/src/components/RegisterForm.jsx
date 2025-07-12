import React, { useState } from "react";
import { registerUser } from "../apis/user.api.js";
import { useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';


const RegisterForm = ({ state }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const data = await registerUser(name, email, password);
      setLoading(false);
      dispatch(login(data.user))
      navigate({ to: "/dashboard" })
      console.log("Registration successful", data);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed. Please try again.");
    }
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <div onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold text-center mb-6"> Create an Account </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="cursor-pointer text-sm text-gray-600">
            Already have an account? <span onClick={() => state(true)} className="relative text-blue-500 after:absolute after:left-1/2 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-blue-500 after:transition-all after:duration-350 after:translate-x-[-50%] hover:after:w-full">Sign In</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm;