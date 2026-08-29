import React from "react";
import { IoMdClose } from "react-icons/io";
import CardContend from "../Card/CardContend";
import { useNavigate } from "react-router-dom";
const CardDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    toggleCartDrawer() 
    navigate("/checkout");
  }
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Cart contents */}
      <div className="grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        <CardContend />
      </div>

      {/* Checkout button */}
      <div className="p-4 bg-white sticky bottom-0">
        <button  onClick={handleCheckout}   className="w-full bg-black text-white py-2 rounded">
          Checkout
        </button>
        <p className="text-sm text-gray-600 mt-2 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
          Shipping, taxes, and discount codes calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CardDrawer;