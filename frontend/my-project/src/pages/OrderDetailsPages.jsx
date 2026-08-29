import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const OrderDetailsPages = () => {
    const {id} = useParams ();

    const [orderDetails, setOrderDetails] = useState(null);
    useEffect(() =>{
    const mockOrderDetails ={
      _id: id,
      createdAt:new Date(),
      isPaid: true,
      isDelivered:false,
      paymentMethod:"E-sewa",
      shippingMethod:"Standard",
      ShippingAddress:{city:"Kathmandu" ,country:"Nepal"},
      orderItems:[
        {
          productId:"1",
          name:"Watch",
          price:"120",
          quantity: 1,
          image:"https://picsum.photos/150?random=2",
        },

          {
          productId:"2",
          name:"Bag",
          price:"120",
          quantity: 1,
          image:"https://picsum.photos/150?random=3",
        },


      ],
    };
    setOrderDetails(mockOrderDetails);
  },[id]);



  return (
   <div className="max-w-7xl mx-auto p-4 sm:p-6">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 ">OrderDetails</h2>
    {!orderDetails ? <p>No Order Details found</p> : <div className="p-4 sm:p-6 rounded-lg border">
      {/*Order info */}
      <div className="flex flex-col sm:flex-row justify-between mb-8">
        <div><h3 className="text-lg md:text-xl font-semibold"> Order ID:#{orderDetails._id }</h3>
        <p className="text-gray-600">
          {new Date(orderDetails.createdAt).toLocaleDateString()}
        </p>
        </div>
          <div className="flex flex-col items-start sm:text-end mt-4 sm:mt-0">
            <span className={`${ !orderDetails.isPaid ? "bg-green-100 text-green-700":"bg-red-100 text-red-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{!orderDetails.isPaid ? "Approve":"Pending"}</span>

            <span className={`${ !orderDetails.isDelivered ? "bg-green-100 text-green-700":"bg-yellow-100 text-yellow-700"} px-3 py-1 rounded-full text-sm font-medium mb-2`}>{!orderDetails.isDelivered ? "Delivered":"Pending Delivered"}</span>
          </div>
          </div>
          {/* Customer, Payment, Shipping Info*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
              <p>Payment Method:{orderDetails.paymentMethod}</p>
              <p>Status:{orderDetails.isPaid ? "paid":"Unpaid"}</p>
            </div>

             <div>
              <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
              <p>Shipping Method:{orderDetails.shippingMethod}</p>
              <p>Adress:{`${orderDetails.ShippingAddress.city},${orderDetails.ShippingAddress.country}`}</p>
            </div>
          </div>

          {/* Product List*/}
          <div className="overflow-x-auto">
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <table className="min-w-full text-gray-600 mb-4">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Unit Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4">Total</th>

                </tr>
              </thead>
              <tbody>
                {orderDetails.orderItems.map((item) => (
                  <tr key={item.productId} className="border-b">
                    <td className="py-2 px-4 flex items-center">
                      <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded-lg  mr-4" />
                      <Link to ={`/product/${item.productId}`} className="text-green-500 hover:underLine">
                      {item.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4 ">${item.price}</td>
                    <td className="py-2 px-4 ">${item.quantity}</td>
                    <td className="py-2 px-4 ">${item.price *item.quantity}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Back to Orders Link*/}
          <Link to="/my-orders" className="text-red-500 hover:underLine">Back to My Orders</Link>


      </div>}
   </div>
  )
}

export default OrderDetailsPages;