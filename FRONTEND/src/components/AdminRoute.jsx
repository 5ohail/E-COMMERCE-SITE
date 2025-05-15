import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../utils/ContextProvider";

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check authentication
  const user = localStorage.getItem("user"); // check user
  const {admin} = useContext(Context)
  return (isAuthenticated && user) && admin ? children : <Navigate to="/" />;
};

export default AdminRoute;
