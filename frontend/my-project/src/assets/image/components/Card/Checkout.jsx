import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayBalButton from "./PayBalButton";

const cart = {
  products: [
    {
      name: "Stylish jacket",
      size: "M",
      color: "Black",
      price: 120,
      image: "https://picsum.photos/150?random=1",
    },
    {
      name: "Stylish jacket",
      size: "F",
      color: "orange",
      price: 120,
      image: "https://picsum.photos/150?random=1",
    },
  ],
  totalPrice: 195,
};

const Checkout = () => {
  const navigate = useNavigate();

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAdsress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successfull", details);
    navigate("/order-confirmation");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/*Left Section*/}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4 ">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 ">Email</label>
            <input
              type="email"
              value="user1234@exmple.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg  mb-4 ">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4 ">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAdsress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">last Name</label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAdsress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full border rounded  required"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 ">Address</label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAdsress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAdsress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Post Code</label>
              <input
                type="text"
                value={shippingAddress.postCode}
                onChange={(e) =>
                  setShippingAdsress({
                    ...shippingAddress,
                    postCode: e.target.value,
                  })
                }
                className="w-full border rounded"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 ">Country</label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAdsress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 ">Phone</label>
            <input
              type="text"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAdsress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full py-2 border rounded"
              required
            />
          </div>

          <div className="mt-6 ">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded border border-black"
              >
                Continue to payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4 "> pay with Paypal</h3>
                <PayPalButton
                  amount={100}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed. Try again.")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summry </h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div key={index} className="flex items-start justify-between py-2 py-2 border-b">
              <div className="flex items-start">
                <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4" />
              </div>
              <div>
              <h3 className="text-md">{product.name}</h3>
              <p className="text-gray-500">Size:{product.size}</p>
              <p className="text-gray-500">Size:{product.color}</p>
              </div>
                    <p className="text-xl">${product.price.toLocaleString()}</p>
            </div>
            
          ))}
          <div className="flex justify-between text-lg mt-4 pt-4 border-t items-center">
            <span>Total</span>
            <span>${cart.totalPrice}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          
          <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
            <p>Total</p>
            <p>${cart.totalPrice?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
