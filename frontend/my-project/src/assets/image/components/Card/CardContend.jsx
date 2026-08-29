import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const CardContend = () => {
  const cardProduct = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "red",
      quantity: 1,
      price: 200,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Jeans",
      size: "L",
      color: "Blue",
      quantity: 1,
      price: 2500,
      image: "https://picsum.photos/200?random=2",
    },
  ];

  return (
    <div>
      {cardProduct.map((product) => (
        <div
          key={product.productId}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover mr-4 rounded"
            />

            <div>
              <h3>{product.name}</h3>

              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>

              <div className="flex items-center mt-2">
                <button className="border rounded px-1 py-1 m-1 text-xl font-medium">
                  -
                </button>

                <span className="mx-4">{product.quantity}</span>

                <button className="border rounded px-1 py-1 m-1 text-xl font-medium">
                  +
                </button>
              </div>
            </div>

            <p className="font-semibold">
              Price: ₹{product.price.toLocaleString()}
            </p>

            <button>
              <RiDeleteBinLine className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardContend;