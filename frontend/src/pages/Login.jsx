import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';


function Login() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const toggleState = () => {
    setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login');
    setFormData({ name: '', email: '', password: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Redirect user to home if already authenticated (token exists)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint =
      currentState === 'Login'
        ? 'http://localhost:4000/login'
        : 'http://localhost:4000/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // ✅ Save token
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/')
        console.log("Token saved:", data.token);
      }

      console.log(`${currentState} success:`, data);
      toast.success(`${currentState} successful`);
    } catch (error) {
      console.error(`${currentState} error:`, error.message);
      toast.error(error.message);
    }

  };


  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Sign Up' && (
        <input
          type='text'
          name='name'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          required
        />
      )}

      <input
        type='email'
        name='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type='password'
        name='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button
        type='submit'
        className='w-full bg-gray-800 text-white py-2 mt-2 rounded-md'
      >
        {currentState}
      </button>

      <div className='text-sm mt-2 w-full flex justify-between'>
        <p>{currentState === 'Login' ? 'Don’t have an account?' : 'Already have an account?'}</p>
        <p
          className='cursor-pointer font-semibold underline'
          onClick={toggleState}
        >
          {currentState === 'Login' ? 'Sign Up' : 'Login'}
        </p>
      </div>
    </form>
  );
}

export default Login;
