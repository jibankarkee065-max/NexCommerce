import React, { useState } from "react";

const EditProductPage = () => {
  const [productDate, setProductDate] = useState({
    name: "",
    description: "",
    price: "",
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150?random=5",
      },
      {
        url: "https://picsum.photos/150?random=6",
      },
    ],
  });

  const handleChange = (e) => {
    setProductDate((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productDate);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={productDate.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={productDate.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={6}
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={productDate.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Count In Stock
          </label>

          <input
            type="number"
            name="countInStock"
            value={productDate.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            SKU
          </label>

          <input
            type="text"
            name="sku"
            value={productDate.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-separated)
          </label>

          <input
            type="text"
            name="sizes"
            value={productDate.sizes.join(",")}
            onChange={(e) =>
              setProductDate({
                ...productDate,
                sizes: e.target.value
                  .split(",")
                  .map((size) => size.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Colors (comma-separated)
          </label>

          <input
            type="text"
            name="colors"
            value={productDate.colors.join(",")}
            onChange={(e) =>
              setProductDate({
                ...productDate,
                colors: e.target.value
                  .split(",")
                  .map((color) => color.trim()),
              })
            }
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Upload Image
          </label>

          <input type="file" onChange={handleImageUpload} />

          <div className="flex gap-4 mt-4">
            {productDate.images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;