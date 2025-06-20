import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../utils/ContextProvider";

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState(false);
  const [list, setList] = useState("");
  const [searchData, setSearchData] = useState([]);
  const { itemsAdded, Data, isActiveOn, setIsActiveOn,user,admin } = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
  };
 

  const handleNavigate = (item) => {
    localStorage.setItem(
      "activeProduct",
      JSON.stringify({ ...item, src: item.image })
    );
    navigate(`/product/${encodeURIComponent(item.name)}`);
    setSearch(false);
    setList("");
  };

  // Search functionality (live)
  useEffect(() => {
    if (list.trim() === "") {
      setSearchData([]);
      return;
    }

    const filtered = Data.filter((item) =>
      item.name.toLowerCase().includes(list.toLowerCase())
    );
    setSearchData(filtered);
  }, [list, Data]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setActive("login");
    }
  }, [location.pathname]);

  return (
    <>
    <nav className="bg-[#ffffff] text-[#000] w-[100vw] flex justify-between items-center lg:px-5 px-3 py-2 fixed lg:relative ">
      <div className="font-semibold text-lg lg:text-3xl">
        <h1 className="logo">Luxora</h1>
      </div>

      {(search && user ) && active == 'product' ? (
        <div className="relative w-[65vw]">
          <input
            type="text"
            value={list}
            onChange={(e) => setList(e.target.value)}
            className="font-light px-2 outline-neutral-300 my-[0.9rem] w-full py-[0.49rem] border-[1px] border-gray-300"
            placeholder="Search products..."
          />
          {searchData.length > 0 &&  (
            <ul className="absolute bg-white border border-gray-300 w-full max-h-60 overflow-y-auto z-50">
              {searchData.map((item) => (
                <>
                  <li
                    key={item.id}
                    onClick={() => handleNavigate(item)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-8 h-8 object-cover"
                    />
                    {item.name}
                  </li>
                  <hr className="border-gray-300" />
                </>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ul className="list-none lg:flex lg:gap-8 lg:justify-center lg:items-center lg:flex-row flex-col lg:py-4 hidden">
          <li>
            <Link
              onClick={() => {
                setActive(null);
                setIsActiveOn(false);
              }}
              className={`lg:text-[1rem] text-[0.7rem] ${
                active === null && !isActiveOn
                  ? "border-b-[1px] border-b-black"
                  : ""
              } px-3 py-2`}
              to="/"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setActive("product")}
              className={`lg:text-[1rem] text-[0.7rem] ${
                active === "product" || isActiveOn
                  ? "border-b-[1px] border-b-black"
                  : ""
              } px-3 py-2`}
              to="/product"
            >
              PRODUCT
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                setActive("contact");
                setIsActiveOn(false);
              }}
              className={`lg:text-[1rem] text-[0.7rem] ${
                active === "contact" && !isActiveOn
                  ? "border-b-[1px] border-b-black"
                  : ""
              } px-3 py-2`}
              to="/contact"
            >
              CONTACT
            </Link>
          </li>
          {admin ? (
            <li>
            <Link
              onClick={() => {
                setActive("admin");
                setIsActiveOn(false);
              }}
              className={`lg:text-[1rem] text-[0.7rem] ${
                active === "admin" && !isActiveOn
                  ? "border-b-[1px] border-b-black"
                  : ""
              } px-3 py-2`}
              to="/admin"
            >
              ADMIN
            </Link>
          </li>) 
          : ""}
          <li>
            <Link
              onClick={() => {
                setActive("login");
                setIsActiveOn(false);
              }}
              className={`lg:text-[1rem] text-[0.7rem] rounded ${
                active === "login" && !isActiveOn
                  ? "bg-black text-white"
                  : "text-black"
              } px-3 py-2`}
              to="/login"
            >
              SIGN-IN
            </Link>
          </li>
          <Link
            onClick={logout}
            className="lg:text-[1rem] text-[0.7rem] text-white bg-red-500 px-3 py-2 rounded"
            to="/login"
          >
            Log Out
          </Link>
        </ul>
      )}

      <div className="accessories lg:flex lg:items-center lg:gap-6 lg:px-4 hidden">
        {search && list? 
        <img src='/remove.svg'
          className="absolute right-[22%] w-5 h-5 cursor-pointer"
          onClick={
            () => 
            setList("")
          }
        /> : null }
        <img
          src="/search.svg"
          className="w-7 cursor-pointer"
          alt="Search"
          onClick={() => {
            setSearch(!search);
            setList("");
            setSearchData([]);
          }}
        />
        <div className="line"></div>
        <Link to="/cart">
          <div className="relative">
            <img src="/cart.svg" className="w-7 cursor-pointer" alt="Cart" />
            {itemsAdded > 0 ? (
              <div className="item-num bg-red-500 text-[0.8rem] text-white rounded-full w-4 h-4 flex justify-center items-center absolute -top-2 -right-2">
                {itemsAdded}
              </div>
            ) : null}
          </div>
        </Link>
        <div className="line"></div>
        <Link to="/user">
          <img src="/user.svg" className="w-9 h-9 cursor-pointer" alt="User" />
        </Link>
      </div>
    </nav>
    <div className=" w-[100vw] block lg:hidden px-3 py-7"></div>
    </>
  );
};

export default Navbar;
