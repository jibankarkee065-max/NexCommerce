import React from 'react'
import { Link } from "react-router-dom";

const GenderCollection = () => {
  return (
    <section className="py-16 px-4 lg-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1">
          <img src="/womens-collection.webp" alt="womens's collection" className="w-full h-100 object-cover" />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 "> Womens's Collection</h2>
            <Link className ="/Collections/all?gender=Women" className =" text-gray-900 underline">Shop Now</Link>
          </div>
        </div>
        {/* Mens's Collection*/}
        <div className="relative flex-1">
          <img src="/mens-collection.webp" alt="Mens's collection" className="w-full h-100 object-cover" />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 "> Mens's Collection</h2>
            <Link className ="/Collections/all?gender=Women" className =" text-gray-900 underline">Shop Now</Link>
          </div>
        </div>


      </div>

    </section>
  )
}

export default GenderCollection