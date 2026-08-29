import React from "react";
import Hero from "../../src/assets/image/components/Layout/Hero";
import GenderCollection from "../assets/image/components/Product/GenderCollection";
import NewArrivels from "../assets/image/components/Product/NewArrivels";
import ProductDetails from "../assets/image/components/Product/ProductDetails";
import ProductGrid from "../assets/image/components/Product/ProductGrid";
import FeaturedCollection from "../assets/image/components/Product/FeaturedCollection";
import FeaturedSection from "../assets/image/components/Product/FeaturedSection";
  
const  placeholderProducts = [
{ _id: "1", name: "Stylish Jacket", price: 400, images: [{ url: "/images/jeans5.jpg" }] },
  { _id: "2", name: "Stylish Jacket", price: 400, images: [{ url: "/images/t-shirt4.jpg" }] },
  { _id: "3", name: "Stylish Jacket", price: 400, images: [{ url: "/images/watch3.jpg" }] },
  { _id: "4", name: "Stylish Jacket", price: 400, images: [{ url: "/images/watch2.jpg" }] },
  { _id: "5", name: "Stylish Jacket", price: 400, images: [{ url: "/images/hoodie3.jpg" }] },
  { _id: "6", name: "Stylish Jacket", price: 400, images: [{ url: "/images/jacket3.jpg" }] },
  { _id: "7", name: "Stylish Jacket", price: 400, images: [{ url: "/images/scot1.jpg" }] },
  { _id: "8", name: "Stylish Jacket", price: 400, images: [{ url: "/images/bag3.jpg" }] },


]

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivels />
      {/* Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      
      <ProductDetails />

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts}/>
      </div>
      <FeaturedCollection />
      <FeaturedSection />
    
     
    </div>
  );
};

export default Home;