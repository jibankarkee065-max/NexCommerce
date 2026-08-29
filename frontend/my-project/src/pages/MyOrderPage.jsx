import React from "react";
import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";


const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    //simulate feching orders

    setTimeout (() => {
      const mockOrders =[
        {
          _id: "12345",
          createdAt:new Date(),
          shippingAddress: {city:"kathmandu", country: "NEPAL"},
          ordersItems:[
            {
              name:"product 1",
              image:"/banner.jpg",
            },
          ],
          totalPrice:100,
          isPaid:true,
        },
 

         {
          _id: "7808990",
          createdAt:new Date(),
          shippingAddress: {city:"kathmandu", country: "NEPAL"},
          ordersItems:[
            {
              name:"product 2",
              image:"/images.jpg",
            },
          ],
          totalPrice:100,
          isPaid:true,
        },

      ];

     setOrders(mockOrders);

    } ,1000);
  },[]);
  const handleRowClick =(orderId) =>{
    navigate(`/order/${orderId}`)
  };


  return (
    <div className="mx-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 ">My orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
           <thead className="bg-gray-300 text-xs uppercase text-gray-700 ">
             <tr>
                 <th className="py-2 px-4 sm:py-3">image</th>
                 <th className="py-2 px-4 sm:py-3">orders ID</th>
                 <th className="py-2 px-4 sm:py-3"> created </th>
                 <th className="py-2 px-4 sm:py-3"> shipping Address</th>
                  <th className="py-2 px-4 sm:py-3"> items</th>
                  <th className="py-2 px-4 sm:py-3">price</th>
                  <th className="py-2 px-4 sm:py-3">Status</th>
             </tr>
           </thead>
           <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id } onClick={() =>handleRowClick(order._id)} className="border-b hover:border-r-gray-50 cursor-pointer">
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img src={order.ordersItems[0].image} alt={order.ordersItems[0].name} className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg" />
                  </td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">#{order._id}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date (order.createdAt).toLocaleDateString}
                    {new Date (order.createdAt).toLocaleTimeString()}
                    </td>      

                    
                    <td className="py-2 px-2 sm:py-4 sm:px-4">
                      {order.shippingAddress ? `${order.shippingAddress.city},${order.shippingAddress.country}`
                      :"N/A"
                      
                    
                    }
                    </td>

                  <td className="py-2 px-2 sm:py-4 sm:px-4">{order.ordersItems.length}</td>

                <td className="py-2 px-2 sm:py-4 sm:px-4">${ order.totalPrice}</td>

                <td className="py-2 px-2 sm:py-4 sm:px-4"> 
                  <span className={`${order.isPaid ? "bg-green-100 text-gray-700 " :"bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                    {order.isPaid ? "Paid":"Pending"}
                  </span>
                </td>

                   </tr>
              ))
            ):(
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500"> You have no order</td>
              </tr>





            )}
           </tbody>
        </table>
      </div>




    </div>
  )
};

export default MyOrderPage;