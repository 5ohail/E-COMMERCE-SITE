import React, { useContext, useEffect, useState } from "react";
import { Context } from "../utils/ContextProvider";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Admin = () => {
  const { user,Data } = useContext(Context);
  const [state, setstate] = useState("admin");
  const [users, setUsers] = useState([]);
  const [Alert,setAlert] = useState(false);
  const [name,setName] = useState("");
  const [brand, setBrand] = useState("");
  const [image,setImage] = useState("");
  const [price,setPrice] = useState("");
  const [description,setDescription] = useState("");
  const [category, setCategory] = useState("");
  const Navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await axios.get("http://localhost:8080/api/user/users");
      setUsers(userData.data);
      console.log(users);
    };
    fetchUser();
  }, [users]);
  const changeAdminStatus = async (e) => {
    if (e.username !== user) {
      const adminStatus = e.admin;
      console.log(adminStatus);
      await axios.post("https://e-commerce-site-en20.onrender.com/api/user/users/update", {
        username: e.username,
        admin: !adminStatus,
      });
    } else {
        setAlert(true);
        setTimeout(() => {
            setAlert(false)
        }, 3000);
    };
  };
  const addProduct = async () =>{
    await axios.post("https://e-commerce-site-en20.onrender.com/api/products/add",{
      name:name,
      brand:brand,
      image:image,
      description:description,
      price:price,
      category:category
    })
    Navigate('/product')
  }
  const removeItem = async (e) =>{
     await axios.post("https://e-commerce-site-en20.onrender.com/api/products/remove",{
      name:e.name,
      brand:e.brand,
      image:e.image,
      description:e.description,
      price:e.price,
      category:e.category
    })
    Navigate('/product');
  }
  return (
    <div className="relative">
      <div className="my-4 mx-6">
        <h1 className="text-3xl font-semibold">Hello {user}👋</h1>
      </div>
      <div className="flex justify-center mx-6 gap-3 mt-6">
        <h3
          className={`border-solid border-black border-[1px] ${
            state == "admin" ? "bg-black text-white" : ""
          } py-2 px-20 rounded font-medium cursor-pointer card-box transition-colors duration-150 ease-in-out`}
          onClick={() => setstate("admin")}
        >
          Users
        </h3>
        <h3
          className={`border-solid border-black border-[1px] ${
            state == "Product" ? "bg-black text-white" : ""
          } py-2 px-20 rounded font-medium cursor-pointer card-box transition-colors duration-150 ease-in-out`}
          onClick={() => setstate("Product")}
        >
          Add Product
        </h3>
        <h3
          className={`border-solid border-black border-[1px] ${
            state == "Remove" ? "bg-black text-white" : ""
          } py-2 px-20 rounded font-medium cursor-pointer card-box transition-colors duration-150 ease-in-out`}
          onClick={() => setstate("Remove")}
        >
          Remove Product
        </h3>
      </div>
      <div className=" flex justify-center mt-5">
        {state == "admin" ? (
          <div className="card-box h-[70vh] w-[80vw] rounded-2xl">
            <h2 className="text-xl flex items-center font-medium m-5">
              Users🔐{" "}
              <span className="text-[0.9rem] font-light text-[#888888]">
                ({users.length} users)
              </span>
            </h2>
            <div className="border-[1px] border-[#88888839] mx-4 rounded-2xl"></div>
            {users.map((e) => (
              <div className="my-2 mx-8 card-box px-4 py-3 w-[75vw] rounded-xl flex items-center justify-between overflow-y-scroll box">
                <div className="flex gap-2 items-center">
                  <img
                    src="/user.svg"
                    alt={e.username}
                    className="h-[3rem] w-[3rem]"
                  />
                  <div>
                    <h2 className="font-semibold text-[1rem]">{e.username}{e.admin?"🛡️" : ""}</h2>
                    <h3 className="text-gray-500 font-light -translate-y-[0.3rem]">
                      {e.email}
                    </h3>
                  </div>
                </div>
                <div>
                  <h2
                    className="text-[0.9rem] text-white cursor-pointer bg-black px-2 rounded-full"
                    onClick={() => changeAdminStatus(e)}
                  >
                    <span className={`${e.admin ? "text-emerald-400" : "text-yellow-300"}`}>{e.admin?"admin":"user"}</span>
                  </h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
        {state == "Product" ? (
          <div className="card-box h-[70vh] w-[80vw] rounded-2xl">
            <h2 className="text-xl font-medium m-5">Add Product👜</h2>
            <div className="border-[1px] border-[#88888839] mx-4 rounded-2xl"></div>
            <div className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 w-[75vw] mx-10">
            <input
            type="text"
            placeholder="Product Name"
            required
            className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={name}
            onChange={(e)=>{
              setName(e.target.value)
            }}
          />
          <input
            type="text"
            placeholder="Brand Name"
            required
            className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={brand}
            onChange={(e)=>{
              setBrand(e.target.value)
            }}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 w-[75vw] mx-10">
        <input
          type="text"
          placeholder="image Link"
          required
          className="w-full border  border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          value={image}
          onChange={(e)=>{
            setImage(e.target.value)
          }}
        />
        <input
            type="text"
            placeholder="category"
            required
            className="w-full border border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={category}
            onChange={(e)=>{
              setCategory(e.target.value)
            }}
          />
        </div>

        <input
          type="text"
          placeholder="Price"
          className="w-[75vw] mx-10 border mt-4 border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          value={price}
          onChange={(e)=>{
            setPrice(e.target.value)
          }}
        />

        <textarea
          rows="4"
          placeholder="Description"
          required
          className="w-[75vw] mx-10 mt-4 border border-gray-300 bg-white text-black rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
          value={description}
          onChange={(e)=>{
            setDescription(e.target.value)
          }}
        ></textarea>
        <button
          type="submit"
          className="bg-black text-white mt-4 translate-x-[67vw] py-3 px-6 rounded-xl text-lg font-medium hover:bg-gray-800 transition duration-300"
          onClick={()=>{
            addProduct()
          }
          }
        >
          Add Product
        </button>
            </div>
            
            </div>
        ) : (
          ""
        )}
        {state == "Remove" ? (
          <div className="card-box h-[70vh] w-[80vw] rounded-2xl ">
            <h2 className="text-xl font-medium m-5">Remove Product🗑️</h2>
            <div className="border-[1px] border-[#88888839] mx-4 rounded-2xl"></div>
            <div className="overflow-y-scroll h-[60vh] box">
              {
                Data.map((e)=>(
                  <div className="flex justify-between card-box m-4">
                    <div className="flex items-center">
                      <img src={e.image} alt={`${e.brand} ${e.name}`} className="h-[5rem] w-[5rem] object-cover my-2 mx-2 rounded" />
                      <div>
                        <h2 className="font-medium">{e.name}</h2>
                        <h2 className="text-sm">Brand: <span className="text-gray-500">{e.brand}</span></h2>
                        <h2>Price: <span className="text-gray-500">{e.price}</span></h2>
                      </div>
                    </div>
                    <img src="/remove.svg" alt="remove" className="cursor-pointer mr-4" 
                    onClick={()=>{
                      removeItem(e);
                    }}/>
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* ALERT CARD */}
      {Alert ?
      (<div className="absolute top-6 left-[50%] -translate-[50%] bg-white card-box py-4 px-10 rounded">
        <p className="text-red-500 flex gap-2"><img src="/remove.svg" alt="cross" />Cannot remove yourself from the admin</p>
      </div>
      ):""}
    </div>
  );
};

export default Admin;
