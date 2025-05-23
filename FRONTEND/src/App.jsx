import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import UserDashboard from "./pages/UserDashboard";
import Buy from "./pages/Buy";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<Home />} />
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
          <Route path="/register" element={<Register />} />
          <Route
            path="/product/:name"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route 
          path="/user"
          element={
            <ProtectedRoute>
             <UserDashboard/>
          </ProtectedRoute>
          }/>
             <Route 
          path="/buy"
          element={
            <ProtectedRoute>
             <Buy/>
          </ProtectedRoute>
          }/>
          {/* ADMIN ROUTE */}
           <Route 
          path="/admin"
          element={
            <AdminRoute>
             <Admin/>
          </AdminRoute>
          }/>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
