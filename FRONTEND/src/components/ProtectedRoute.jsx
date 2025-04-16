import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check authentication
  const user = localStorage.getItem("user"); // check user
  return isAuthenticated && user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
