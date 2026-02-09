import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser, FaChartLine, FaAddressBook, FaCcAmazonPay, FaRegAddressCard } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {logout} from "../../redux/slices/authSlice"
import {clearCart} from "../../redux/slices/cartSlice"

const AdminSidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout=()=>{
        dispatch(logout())
        dispatch(clearCart())
        navigate("/")
    }

    return (
        <div className='p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl h-full border border-gray-100'>
            <div className="mb-8">
                <Link to="/admin" className='flex items-center justify-center space-x-3 mb-6 backdrop-blur-sm bg-white/30 p-4 rounded-xl'>
                    <FaChartLine className="text-3xl text-indigo-600" />
                    <span className='text-2xl  text-gray-800'>
                        Admin 
                    </span>
                </Link>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
            </div>

            <nav className='flex flex-col space-y-3'>
                <NavLink 
                    to="/admin/users" 
                    className={({isActive}) => 
                        `transition-all duration-300 rounded-xl flex items-center space-x-3 px-4 py-3 backdrop-blur-sm
                        ${isActive 
                            ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-200" 
                            : "bg-white/50 text-gray-700 hover:bg-white hover:text-indigo-600 hover:translate-x-1 hover:shadow-md"}`
                    }
                >
                    <FaUser className="text-lg" />
                    <span className="font-medium">Users</span>
                </NavLink>

                <NavLink 
                    to="/admin/add-product" 
                    className={({isActive}) => 
                        `transition-all duration-300 rounded-xl flex items-center space-x-3 px-4 py-3 backdrop-blur-sm
                        ${isActive 
                            ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-200" 
                            : "bg-white/50 text-gray-700 hover:bg-white hover:text-indigo-600 hover:translate-x-1 hover:shadow-md"}`
                    }
                >
                    <FaBoxOpen className="text-lg" />
                    <span className="font-medium">Add Product</span>
                </NavLink>

                <NavLink 
                    to="/admin/products" 
                    className={({isActive}) => 
                        `transition-all duration-300 rounded-xl flex items-center space-x-3 px-4 py-3 backdrop-blur-sm
                        ${isActive 
                            ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-200" 
                            : "bg-white/50 text-gray-700 hover:bg-white hover:text-indigo-600 hover:translate-x-1 hover:shadow-md"}`
                    }
                >
                    <FaBoxOpen className="text-lg" />
                    <span className="font-medium">Manage Products</span>
                </NavLink>

                <NavLink 
                    to="/admin/orders" 
                    className={({isActive}) => 
                        `transition-all duration-300 rounded-xl flex items-center space-x-3 px-4 py-3 backdrop-blur-sm
                        ${isActive 
                            ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-200" 
                            : "bg-white/50 text-gray-700 hover:bg-white hover:text-indigo-600 hover:translate-x-1 hover:shadow-md"}`
                    }
                >
                    <FaClipboardList className="text-lg" />
                    <span className="font-medium">Orders</span>
                </NavLink>

                <NavLink 
                    to="/admin"
                    end 
                    className={({isActive}) => 
                        `transition-all duration-300 rounded-xl flex items-center space-x-3 px-4 py-3 backdrop-blur-sm
                        ${isActive 
                            ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg shadow-indigo-200" 
                            : "bg-white/50 text-gray-700 hover:bg-white hover:text-indigo-600 hover:translate-x-1 hover:shadow-md"}`
                    }
                >
                    <FaRegAddressCard className="text-lg" />
                    <span className="font-medium">Dashboard</span>
                </NavLink>
            </nav>

            <div className="mt-auto pt-6">
                <div className="h-0.5 bg-gradient-to-r from-transparent via-indigo-200 to-transparent mb-6"></div>
                <button 
                    onClick={handleLogout} 
                    className='w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:from-rose-600 hover:to-pink-600 flex items-center justify-center space-x-2'
                >
                    <FaSignOutAlt className="text-lg" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default AdminSidebar