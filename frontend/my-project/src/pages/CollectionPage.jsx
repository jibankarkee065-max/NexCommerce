import React, { useState, useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../assets/image/components/Product/FilterSidebar";
import SortOptions from "../assets/image/components/Product/SortOptions";
import ProductGrid from "../assets/image/components/Product/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toogleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // Close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add Event Listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up Event Listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts = [
        { _id: "1", name: "Stylish Jacket", price: 400, images: [{ url: "/images/hoodie3.jpg" }] },
        { _id: "2", name: "Stylish Jacket", price: 400, images: [{ url: "/images/cap1.jpg" }] },
        { _id: "3", name: "Stylish Jacket", price: 400, images: [{ url: "/images/jeans1.jpg" }] },
        { _id: "4", name: "Stylish Jacket", price: 400, images: [{ url: "/images/watch2.jpg" }] },
        { _id: "5", name: "Stylish Jacket", price: 400, images: [{ url: "/images/watch3.jpg" }] },
        { _id: "6", name: "Stylish Jacket", price: 400, images: [{ url: "/images/shoe3.jpg" }] },
        { _id: "7", name: "Stylish Jacket", price: 400, images: [{ url: "/images/t-shirt4.jpg" }] },
        { _id: "8", name: "Stylish Jacket", price: 400, images: [{ url: "/images/scot1.jpg" }] },
      ];

      setProducts(fetchedProducts);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter Button */}
      <button
        onClick={toogleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" />
        Filter
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${isSidebarOpen ? "translate-x-0" : "translate-x-full"}  fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className="flex-grow p-4 ">
        <h2 className="text-2xl upperCase mb-4">All Collection</h2>

      {/*Sort Options */}
       
       <SortOptions />

       {/* Product grid*/}
        
        <ProductGrid products ={products} />










      </div>
    </div>
  );
};

export default CollectionPage;