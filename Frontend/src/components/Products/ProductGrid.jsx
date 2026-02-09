import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingBag } from 'react-feather';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {[1].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="w-full h-60 bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div key={index} className="group relative">
          <Link to={`/product/${product._id}`} className="block">
            <div className="bg-white rounded-lg p-4 shadow-md transition-transform duration-300 hover:shadow-lg">
              <div className="relative w-full h-60 mb-4 overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={product.images[0]?.url}
                  alt={product.name}
                />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</h3>
              <div className="flex items-baseline gap-2">
                {product.discountPrice ? (
                  <>
                    <span className="text-sm font-semibold text-gray-900">₹{product.discountPrice}</span>
                    <span className="text-xs text-gray-500 line-through">₹{product.price}</span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-gray-900">₹{product.price}</span>
                )}
              </div>

              <button className="w-full mt-4 py-2 bg-black text-white text-sm font-medium rounded-lg flex items-center justify-center gap-1 transition-all duration-300 hover:bg-gray-800">
                <ShoppingBag className="w-4 h-4" />
                Quick Add
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;