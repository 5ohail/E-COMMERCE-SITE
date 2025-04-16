import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Product from './pages/Product'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/product" 
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          } 
        />
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
