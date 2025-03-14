import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/Login'
import { useContext, useState } from 'react'
import Navbar from './components/Navbar'
import { Context } from './utils/ContextProvider'
import Cart from './pages/Cart'
import Product from './pages/Product'


function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product' element={<Product/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
