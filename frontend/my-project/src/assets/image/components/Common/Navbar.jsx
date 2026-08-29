import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";

import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

import { FaMale, FaFemale } from "react-icons/fa";
import { GiTShirt, GiArmoredPants } from "react-icons/gi";

import SearchBar from "./SearchBar";
import CardDrawer from "../Layout/CardDrawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen((prev) => !prev);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-5 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-medium">
          Rabbit
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            to="/"
          >
            Men
          </Link>

          <Link
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            to="/"
          >
            Women
          </Link>

          <Link
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            to="/"
          >
            Top Wear
          </Link>

          <Link
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
            to="/"
          >
            Bottom Wear
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 bg-black px-2 py-1 rounded text-sm text-white"
          >
            <MdAdminPanelSettings className="w-6 h-6 text-white" />
            Admin
          </Link>

          <Link to="/profile">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button onClick={toggleCartDrawer} className="relative">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>

          <SearchBar />

          {/* Mobile Menu Button */}
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiMenuAlt3 className="h-8 w-8 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CardDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-5">
          <Link
            to="/"
            onClick={toggleNavDrawer}
            className="flex items-center gap-3 text-gray-700 hover:text-black text-lg"
          >
            <FaMale />
            Men
          </Link>

          <Link
            to="/"
            onClick={toggleNavDrawer}
            className="flex items-center gap-3 text-gray-700 hover:text-black text-lg"
          >
            <FaFemale />
            Women
          </Link>

          <Link
            to="/"
            onClick={toggleNavDrawer}
            className="flex items-center gap-3 text-gray-700 hover:text-black text-lg"
          >
            <GiTShirt />
            Top Wear
          </Link>

          <Link
            to="/"
            onClick={toggleNavDrawer}
            className="flex items-center gap-3 text-gray-700 hover:text-black text-lg"
          >
            <GiArmoredPants />
            Bottom Wear
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
