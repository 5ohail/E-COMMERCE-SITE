import { useContext, useState } from "react";
import { Context } from "../utils/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Billing() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [saveInfo, setSaveInfo] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const { order,user } = useContext(Context);
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [streetAddress,setStreetAdress] = useState("");
  const [apartment,setApartment] =  useState("");
  const [town,setTown] = useState("");
  const [state,setState] = useState("");
  const [phone,setPhone] = useState("");
  const [postal,setPostal] = useState("");
  const [country,setCountry] = useState("");
  const Navigate = useNavigate();
  let total = 0;
  order.map((e) => (total += e.price));
  total = (total - (total * 0.2) ).toFixed(2)
  const formHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/order", {
      username:user,
      orders: order,
      paymentMethod: paymentMethod,
      price: total,
      shippingAddress: {
        fullName: `${firstName} ${lastName}`,
        phone: phone,
        addressLine1: streetAddress,
        addressLine2 : apartment,
        city : town,
        state : state,
        postalCode: postal,
        country : country
      }
      
      
      
    })
    alert("order Succesfully placed")
    Navigate('/product');;
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Billing Details</h2>

          <form className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-600 mb-2">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full p-3 bg-gray-100 rounded"
                value={firstName}
                onChange={e=>{
                  setFirstName(e.target.value)
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-gray-600 mb-2">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-3 bg-gray-100 rounded"
                 value={lastName}
                onChange={e=>{
                  setLastName(e.target.value)
                }}
                required
              />
            </div>

            <div>
              <label
                htmlFor="streetAddress"
                className="block text-gray-600 mb-2"
              >
                Street Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="streetAddress"
                name="addressLine1"
                className="w-full p-3 bg-gray-100 rounded"
                 value={streetAddress}
                onChange={e=>{
                  setStreetAdress(e.target.value)
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="apartment" className="block text-gray-600 mb-2">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                id="apartment"
                name="addressLine2"
                className="w-full p-3 bg-gray-100 rounded"
                 value={apartment}
                onChange={e=>{
                  setApartment(e.target.value)
                }}
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-gray-600 mb-2">
                Town/City<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full p-3 bg-gray-100 rounded"
                 value={town}
                onChange={e=>{
                  setTown(e.target.value)
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-gray-600 mb-2">
                State<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full p-3 bg-gray-100 rounded"
                 value={state}
                onChange={e=>{
                  setState(e.target.value)
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-600 mb-2">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-3 bg-gray-100 rounded"
                 value={phone}
                onChange={e=>{
                  setPhone(e.target.value)
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="postalCode" className="block text-gray-600 mb-2">
                Postal Code<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className="w-full p-3 bg-gray-100 rounded"
                 value={postal}
                onChange={e=>{
                  setPostal(e.target.value)
                }}
                required
              />
            </div>
            

            <div>
              <label htmlFor="country" className="block text-gray-600 mb-2">
                Country<span className="text-red-500">*</span>
              </label>
              <input
                type="country"
                id="country"
                className="w-full p-3 bg-gray-100 rounded"
                 value={country}
                onChange={e=>{
                  setCountry(e.target.value)
                }}
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveInfo"
                checked={saveInfo}
                onChange={() => setSaveInfo(!saveInfo)}
                className="w-5 h-5 text-black border-gray-300 rounded"
              />
              <label htmlFor="saveInfo" className="ml-2 text-gray-700">
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="space-y-6 py-4 card-box">
            <div className={` mx-2 py-0.5 overflow-y-scroll ${order.length !=0 ? `h-[${order.length <= 5 ?order.length * 10 : 50}vh]`: ''} box`}>
              {order.length ?
              order.map((e, idx) => {

                  return (
                    <div className="flex justify-left mx-2 items-top gap-2 card-box p-2 my-2 cursor-pointer">
                      <img
                        src={e.src}
                        alt={`${e.brand} ${e.name}`}
                        className="h-[5rem] w-[5rem] object-cover "
                      />
                      <div className="text-sm">
                        <p>
                          Name : <span className="text-gray-500">{e.name}</span>
                        </p>
                        <p>
                          Quantity :{" "}
                          <span className="text-gray-500">{e.quantity}</span>
                        </p>
                        <p className="font-medium">${e.price}</p>
                      </div>
                    </div>
                  );
                
              }):""}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between px-3">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">${total}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between px-3">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-medium">Free</span>
            </div>

            <hr className="border-gray-200" />

            {/* Total */}
            <div className="flex justify-between px-3">
              <span className="text-gray-600 font-medium">Total:</span>
              <span className="font-bold">${total}</span>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <div className="flex items-center px-3">
                <input
                  type="radio"
                  id="bank"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="w-5 h-5 text-red-500"
                />
                <label htmlFor="bank" className="ml-2 flex items-center">
                  <span className="mr-4">Bank</span>
                  <div className="flex space-x-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center px-3">
                <input
                  type="radio"
                  id="COD"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="w-5 h-5 text-red-500"
                />
                <label htmlFor="COD" className="ml-2">
                  Cash on delivery
                </label>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="flex space-x-2 px-3">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded"
              />
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                Apply Coupon
              </button>
            </div>

            {/* Place Order Button */}
            <button className="w-[95%] mx-3 bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors"
            onClick={formHandler}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
