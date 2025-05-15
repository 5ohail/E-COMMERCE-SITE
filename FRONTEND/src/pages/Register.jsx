import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const Navigate = useNavigate()
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      await axios.post("https://e-commerce-site-en20.onrender.com/api/user/register",{
        username,
        password,
        email
      });
      Navigate('/login')
    }
    catch(error){
      setPassword('')
      setUsername('')
      setEmail('')
      console.error("Login failed", error);
    }
  }
  return (
    <div className='flex items-center h-full relative'>
    <form className='flex flex-col w-1/2 px-[10vw] gap-5' onSubmit={handleRegister}>
      <h1 className='font-semibold text-4xl text-center'>Register</h1>
      <div className='flex flex-col gap-2'>
        <label htmlFor='username' className='font-semibold'>Username</label>
        <input type='text' name='username' className='border border-gray-400 p-2 rounded-md' value={username} 
          onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='email' className='font-semibold'>Email</label>
        <input type='email' name='email' className='border border-gray-400 p-2 rounded-md' value={email} 
          onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='password' className='font-semibold'>Password</label>
        <input type='password' name='password' className='border border-gray-400 p-2 rounded-md' value={password} 
          onChange={(e) => setPassword(e.target.value)} />
      </div>
      
      <button type="submit" className='bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition'>
        Register
      </button>
      <p className='text-sm text-center'>Already have an account? <Link className='text-blue-500' to='/login'>Login now</Link></p>
    </form>
    <div className='w-1/2 h-full'>
      <img
        src='https://images-na.ssl-images-amazon.com/images/I/71yCv%2BIBtDL._SL1500_.jpg'
        alt='Login Image'
        className='w-full h-full object-cover'
      />
    </div>
  </div>
  )
}

export default Register