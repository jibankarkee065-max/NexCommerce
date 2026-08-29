import React, { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const newArrivals = [
  { _id: "1", name: "Stylish Jacket", price: 400, images: [{ url: "/images/shoe1.jpg" }] },
  { _id: "2", name: "Stylish Jacket", price: 400, images: [{ url: "/images/scot1.jpg" }] },
  { _id: "3", name: "Stylish Jacket", price: 400, images: [{ url: "/images/jacket1.1jpg" }] },
  { _id: "4", name: "Stylish Jacket", price: 400, images: [{ url: "/images/hoodie3.jpg" }] },
   { _id: "1", name: "Stylish Jacket", price: 400, images: [{ url: "/images/shoe2.jpg" }] },
  { _id: "2", name: "Stylish Jacket", price: 400, images: [{ url: "/images/t-shirt3.jpg" }] },
  { _id: "3", name: "Stylish Jacket", price: 400, images: [{ url: "/images/jacket2.1jpg" }] },
  { _id: "4", name: "Stylish Jacket", price: 400, images: [{ url: "/images/hoodie3.jpg" }] },
   { _id: "1", name: "Stylish Jacket", price: 400, images: [{ url: "/images/shoe1.jpg" }] },
  { _id: "2", name: "Stylish Jacket", price: 400, images: [{ url: "/images/scot1.jpg" }] },
  { _id: "3", name: "Stylish Jacket", price: 400, images: [{ url: "/images/jacket1.1jpg" }] },
  { _id: "4", name: "Stylish Jacket", price: 400, images: [{ url: "/images/hoodie3.jpg" }] },
   { _id: "1", name: "Stylish Jacket", price: 400, images: [{ url: "/images/shoe2.jpg" }] },
  { _id: "2", name: "Stylish Jacket", price: 400, images: [{ url: "/images/t-shirt3.jpg" }] },
  { _id: "3", name: "Stylish Jacket", price: 400, images: [{ url: "/images/jacket2.1jpg" }] },
  { _id: "4", name: "Stylish Jacket", price: 400, images: [{ url: "/images/hoodie3.jpg" }] },
   
   
   
];

const NewArrivels = () => {
  const scrollRef = useRef(null);

  const [isDragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = direction === "left" ? -300 : 300;

    el.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setStartX(e.pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX;
    const walk = x - startX;

    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => setDragging(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>

        <p className="text-gray-600 mb-8">
          Discover the latest styles straight off the runway.
        </p>

        <div className="absolute right-0 flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 border rounded ${
              canScrollLeft ? "bg-white" : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 border rounded ${
              canScrollRight ? "bg-white" : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* FIXED SCROLLER */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto flex flex-nowrap gap-6 px-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {newArrivals.map((product) => (
          <div key={product._id} className="min-w-62.5 relative shrink-0">
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="w-full h-62.5 object-cover rounded-lg block"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/500";
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 rounded-b-lg">
              <Link to={`/product/${product._id}`}>
                <h4 className="font-semibold">{product.name}</h4>
                <p>${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivels;