import React, { useState } from 'react';

function Login() {
  const [currentState, setCurrentState] = useState('Sign Up');

  const toggleState = () => {
    setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    // Add login/signup logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      {/* Heading */}
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Name Field (Only for Sign Up) */}
      {currentState === 'Login' ? null : (
        <input
          type='text'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      {/* Email and Password */}
      <input
        type='email'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />
      <input
        type='password'
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />

      {/* Submit Button */}
      <button
        type='submit'
        className='w-full bg-gray-800 text-white py-2 mt-2 rounded-md'
      >
        {currentState}
      </button>

      {/* Toggle Button */}
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
