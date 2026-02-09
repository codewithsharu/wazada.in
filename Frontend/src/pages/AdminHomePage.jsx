import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAdminProducts } from '../redux/slices/adminProductSlice';
import { fetchAllOrders } from '../redux/slices/adminOrderSlice';
import { FaDollarSign, FaShoppingCart, FaBoxOpen, FaArrowRight } from 'react-icons/fa';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { products, loading: productsLoading, error: productsError } = useSelector(state => state.adminProducts);
    const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector(state => state.adminOrders);

    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOrders());
    }, [dispatch]);

    if (productsLoading || ordersLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
            </div>
        );
    }

    if (productsError || ordersError) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">Error: {productsError || ordersError}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <div className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleDateString()}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-50">
                                <FaDollarSign className="text-2xl text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Revenue</p>
                                <h3 className="text-2xl font-bold text-gray-800">₹{totalSales.toFixed(2)}</h3>
                            </div>
                        </div>
                        <div className="text-green-500 text-sm font-medium">
                            +12.5%
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-50">
                                <FaShoppingCart className="text-2xl text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Orders</p>
                                <h3 className="text-2xl font-bold text-gray-800">{totalOrders}</h3>
                            </div>
                        </div>
                        <Link to="/admin/orders" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                            Manage Orders <FaArrowRight className="ml-1" />
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-50">
                                <FaBoxOpen className="text-2xl text-yellow-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Total Products</p>
                                <h3 className="text-2xl font-bold text-gray-800">{products.length}</h3>
                            </div>
                        </div>
                        <Link to="/admin/products" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                            Manage Products <FaArrowRight className="ml-1" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
                </div>
                {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.slice(0, 5).map(order => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{order._id.slice(-6)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₹{order.totalPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No recent orders found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHomePage;
