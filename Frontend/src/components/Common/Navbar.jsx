import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiOutlineHeart } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const isSpecial = location.pathname === "/";
  const {user} = useSelector((state)=>state.auth)
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const {cart} = useSelector((state)=>state.cart);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cartItemCount = cart?.products?.reduce((total, product)=> total + product.quantity, 0) || 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 50;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      setScrollProgress(progress);
      setHasScrolled(scrollPosition > maxScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className={`w-full flex items-center py-4 px-6 transition-all duration-300 ${
        isSpecial 
          ? 'fixed top-0 left-0 right-0 z-50 ' + (hasScrolled ? 'bg-black' : 'bg-transparent') 
          : ''
      } text-white`}>
        {/* Left navigation links */}
        <div className="flex-1 hidden md:flex space-x-6">
          <Link
            to="/collections/all?gender=Men"
            className={`${isSpecial ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'} text-sm font-medium uppercase`}
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className={`${isSpecial ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'} text-sm font-medium uppercase`}
          >
            Women
          </Link>
          <Link
            to="https://orial-comunity-frontend.vercel.app/"
            className={`${isSpecial ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'} text-sm font-medium uppercase`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Community
          </Link>
          <Link
            to="/collections/all?category=Collection"
            className={`${isSpecial ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'} text-sm font-medium uppercase`}
          >
            store
          </Link>

          <Link
            to="/thrift"
            className={`${isSpecial ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-black'} text-sm font-medium uppercase`}
          >
            Thrift Store
          </Link>
       

       

       
        </div>

        {/* Center Logo */}
        <div className="flex-1 md:text-center text-left">
          <Link to="/" className={`group flex flex-col md:items-center items-start ${isSpecial ? 'text-white' : 'text-black'}`}>
            <div className="relative">
              <span 
                className="text-xl md:text-4xl font-playfair"
                style={{
                  letterSpacing: `${0.2 + (scrollProgress * 0.1)}em`,
                  transform: `scale(${1 - (scrollProgress * 0.1)})`
                }}
              >
                wazada
              </span>
            
            </div>
          
  
          </Link>
        </div>

        {/* right-icons */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          {user && user.role === "admin" && (<Link to="/admin" className="bg-black block px-2 rounded text-sm text-white ">
            Admin
          </Link>)}
          <Link to="/profile" className={`hover:opacity-80 ${isSpecial ? 'text-white' : ''}`}>
            <HiOutlineUser className={`h-6 w-6 ${isSpecial ? 'text-white' : 'text-gray-700'}`} />
          </Link>

          
          <button
            onClick={toggleCartDrawer}
            className={`relative hover:opacity-80 ${isSpecial ? 'text-white' : ''}`}
          >
            <HiOutlineShoppingBag className={`h-6 w-6 ${isSpecial ? 'text-white' : 'text-gray-700'}`} />
            {cartItemCount > 0 && ( <span className="absolute bg-rabit-red text-white text-xs rounded-full px-2 py-0.5 -top-2 ">
              {cartItemCount}
            </span>) }
           
          </button>
          {/* Search-icon */}
          <div className="owerflow-hidden text-black">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className={`h-7 w-6 ${isSpecial ? 'text-white' : 'text-gray-700'}`} />
          </button>
         
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4 ">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 ">Menu</h2>
          <nav className="space-y-4 ">
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-600 hover:text-black text-sm font-medium uppercase"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              WOMEN
            </Link>
            <Link
              to="https://wazada-comunity-frontend.vercel.app/"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              COMMUNITY
            </Link>
            <Link
              to="/collections/all?category=Collection"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              COLLECTION
            </Link>
            <Link
              to="/thrift"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black"
            >
              THRIFT
            </Link>
            
            
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
