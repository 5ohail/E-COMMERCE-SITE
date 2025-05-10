import React, { useContext, useState } from "react";
import { Context } from "../utils/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const { user, email, order } = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white text-black min-h-screen">
      <h1 className="text-4xl font-light mb-6 ">Welcome Back!</h1>
      <div className="grid grid-cols-4 gap-2 mb-6">
        <button
          onClick={() => setActiveTab("orders")}
          className={`py-2 px-4 rounded shadow-md transition ${
            activeTab === "orders"
              ? "bg-black text-white"
              : "bg-white text-black border-gray-400 border-solid border-[1px]"
          }`}
        >
          My Orders
        </button>
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`py-2 px-4 rounded shadow-md transition ${
            activeTab === "wishlist"
              ? "bg-black text-white"
              : "bg-white text-black border-gray-400 border-solid border-[1px]"
          }`}
        >
          Wishlist
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`py-2 px-4 rounded shadow-md transition ${
            activeTab === "settings"
              ? "bg-black text-white"
              : "bg-white text-black border-gray-400 border-solid border-[1px]"
          }`}
        >
          Account Settings
        </button>
        <button
          onClick={() => setActiveTab("logout")}
          className={`py-2 px-4 rounded shadow-md transition ${
            activeTab === "logout"
              ? "bg-red-500 text-white"
              : "bg-white text-black border-gray-400 border-solid border-[1px]"
          }`}
        >
          Logout
        </button>
      </div>

      {activeTab === "orders" && (
        <div className="p-4 border-gray-400 border-solid border-[1px] rounded shadow bg-white">
          <h2 className="text-xl font-medium mb-2 ">Recent Orders</h2>
          {order.length ? (
            order.map((e, index) => <p key={index}>{e.name}</p>)
          ) : (
            <p>No orders available</p>
          )}
        </div>
      )}

      {activeTab === "wishlist" && (
        <div className="p-4 border-gray-400 border-solid border-[1px] rounded shadow bg-white">
          <h2 className="text-xl font-medium mb-2 ">Your Wishlist</h2>
          <p>Your wishlist is empty.</p>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="p-4 border-gray-400 border-solid border-[1px] rounded shadow bg-white space-y-4">
          <h2 className="text-xl font-medium mb-2">Account Info</h2>
          <div>
            <p>
              Name: <span className="font-semibold ">{user.toUpperCase()}</span>
            </p>
            <p>
              Email: <span className="font-semibold">{email}</span>
            </p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded shadow-md">
            Edit Profile
          </button>
        </div>
      )}

      {activeTab === "logout" && (
        <div className="p-4 border-gray-400 border-solid border-[1px] rounded shadow bg-white">
          <h2 className="text-xl font-medium mb-2 ">Ready to Logout?</h2>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 duration-100 ease-in cursor-pointer"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
