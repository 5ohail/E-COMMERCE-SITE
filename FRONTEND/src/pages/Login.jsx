import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../utils/ContextProvider';

const Login = () => {
  const {user,setUser} = useContext(Context)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://e-commerce-site-en20.onrender.com/api/user/login", {
        username,
        password,
      });
  
      localStorage.setItem("token", data.token);
      setUser(username) // Store token after login
      navigate("/");
    } catch (error) {
      alert("invalid credentials")
      setPassword('')
      setUsername('')
      console.error("Login failed", error);
    }
  };

  return (
    <div className='flex items-center h-full relative'>
      <form className='flex flex-col w-1/2 px-[10vw] gap-5' onSubmit={handleSubmit}>
        <h1 className='font-semibold text-4xl text-center'>Sign In</h1>
        <div className='flex flex-col gap-2'>
          <label htmlFor='username' className='font-semibold'>Username</label>
          <input type='text' name='username' className='border border-gray-400 p-2 rounded-md' value={username} 
            onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='password' className='font-semibold'>Password</label>
          <input type='password' name='password' className='border border-gray-400 p-2 rounded-md' value={password} 
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className='bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition'>
          Login
        </button>
        <p className='text-sm text-center'>Don't have an account? <Link className='text-blue-500' to='/register'>Register now</Link></p>
      </form>
      <div className='w-1/2 h-full'>
        <img
          src='https://images-na.ssl-images-amazon.com/images/I/71yCv%2BIBtDL._SL1500_.jpg'
          alt='Login Image'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default Login;
