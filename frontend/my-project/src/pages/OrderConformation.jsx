import React from "react";

const Checkout = {
  _id: "12323",
  createdAt: new Date(),
  CheckoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Red",
      size: "M",
      price: 150,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "2",
      name: "Watch",
      color: "Blue",
      size: "F",
      price: 250,
      quantity: 1,
      image: "https://picsum.photos/150?random=2",
    },
  ],
  shippingAddress: {
    address: "32 koteshower",
    city: "Kathmandu",
    country: "Nepal",
  },
};

const OrderConformation = () => {
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank You For Your Order!
      </h1>

      {Checkout && (
        <div className="p-6 rounded-lg border shadow">

          {/* Order ID and Date */}
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {Checkout._id}
              </h2>

              <p className="text-gray-500">
                Order Date:{" "}
                {new Date(Checkout.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm font-medium">
                Estimated Delivery:{" "}
                {calculateEstimatedDelivery(Checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Ordered Items
            </h2>

            {Checkout.CheckoutItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center border-b py-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="">
                    <h4 className="text-md font-semibold">{item.name}</h4>
                    <p className="text-md text-gray-500">{item.color} || {item.size}</p>
                </div>

                <div className="ml-auto text-right">
                    <p className="text-md">${item.price}</p>
                    <p className="text-md text-gray-500">Qty: {item.quantity}</p>
                </div>


                
              </div>
            ))}
          </div>
          {/* Payment and Delivery Info*/}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment info*/}
            <div>
                <h4 className="text-lg font-semibold mb-2 ">Payment</h4>
                <p className="text-gray-600">PayPal</p>
            </div>
            {/* Delivery info*/}
            <div>
                <h4 className="text-lg font-semibold mb-2">Delivery</h4>
                <p className="text-gray-700">{Checkout.shippingAddress.address}</p>
                <p className="text-gary-700">{Checkout.shippingAddress.city},{""}{Checkout.shippingAddress.country}</p>




            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConformation;