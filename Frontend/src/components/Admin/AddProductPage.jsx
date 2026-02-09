import React, { useState } from 'react';

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    countInStock: '',
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: '',
    material: '',
    gender: 'Unisex',
    images: [],
    isFeatured: false,
    isPublished: false,
    tags: [],
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    weight: '',
    thrift: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInput = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleeArrayInput = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim().toUpperCase());
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.imageUrl) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, { url: data.imageUrl }]
        }));
      }
    } catch (err) {
      setError('Failed to upload image');
    }
    setUploadingImage(false);
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    console.log("Form Data being submitted:", formData); // Debugging line

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Failed to add product');
      }

      setSuccess('Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        countInStock: '',
        sku: '',
        category: '',
        brand: '',
        sizes: [],
        colors: [],
        collections: '',
        material: '',
        gender: 'Unisex',
        images: [],
        isFeatured: false,
        isPublished: false,
        tags: [],
        dimensions: {
          length: '',
          width: '',
          height: ''
        },
        weight: '',
        thrift: false
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl  text-gray-900">Add New Product</h1>
          <p className="mt-2 text-gray-600">Fill in the details to create a new product in your inventory</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                <div className="flex">
                  <svg className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                <div className="flex">
                  <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-medium text-green-800">{success}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      SKU
                    </label>
                    <input
                      type="text"
                      name="sku"
                      placeholder="Enter SKU"
                      value={formData.sku}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing & Inventory</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Discount Price (₹)
                    </label>
                    <input
                      type="number"
                      name="discountPrice"
                      placeholder="0.00"
                      value={formData.discountPrice}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      name="countInStock"
                      placeholder="0"
                      value={formData.countInStock}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      placeholder="Enter product description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select Category</option>
                        <option value="Top Wear">Top Wear</option>
                        <option value="Bottom Wear">Bottom Wear</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Brand
                      </label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="" disabled>Select Brand</option>
                        <option value="Urban Threads">Urban Threads</option>
                        <option value="Modern Fit">Modern Fit</option>
                        <option value="Gucci">Gucci</option>
                        <option value="Street Style">Street Style</option>
                        <option value="Beach Breeze">Beach Breeze</option>
                        <option value="Fashion Insta">Fashion Insta</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Collection
                      </label>
                      <input
                        type="text"
                        name="collections"
                        placeholder="Enter collection name"
                        value={formData.collections}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Material
                      </label>
                      <select
                        name="material"
                        value={formData.material}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="" disabled>Select Material</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Wool">Wool</option>
                        <option value="Denim">Denim</option>
                        <option value="Polyester">Polyester</option>
                        <option value="Silk">Silk</option>
                        <option value="Linen">Linen</option>
                        <option value="Viscose">Viscose</option>
                        <option value="Fleece">Fleece</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Sizes
                      </label>
                      <input
                        type="text"
                        name="sizes"
                        placeholder="S, M, L, XL (comma-separated)"
                        value={formData.sizes.join(', ')}
                        onChange={(e) => handleeArrayInput(e, 'sizes')}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Colors
                      </label>
                      <input
                        type="text"
                        name="colors"
                        placeholder="Red, Blue, Green (comma-separated)"
                        value={formData.colors.join(', ')}
                        onChange={(e) => handleArrayInput(e, 'colors')}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Images</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Images
                      </label>
                      <div className="flex items-center">
                        <label className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                          <span className="text-indigo-600 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            Choose Image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImage}
                            className="hidden"
                          />
                        </label>
                        {uploadingImage && (
                          <div className="ml-4 flex items-center text-gray-600">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-indigo-500 mr-2"></div>
                            <span>Uploading...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 w-full rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={image.url}
                            alt={`Product ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">Published</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">Featured Product</span>
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.thrift}
                        onChange={(e) => {
                          const newValue = e.target.checked;
                          setFormData(prev => {
                            console.log("Thrift value changed:", newValue); // Debugging line
                            return { ...prev, thrift: newValue };
                          });
                        }}
                        className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">Thrift Item</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(loading || uploadingImage) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Product...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Create Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;