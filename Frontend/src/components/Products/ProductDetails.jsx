import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams, useNavigate } from 'react-router-dom'; // Updated this line
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProduct } from '../../redux/slices/productSlice';
import { addToCart } from '../../redux/slices/cartSlice';
import { Heart, Minus, Plus, ShoppingBag, Share2, Truck, RefreshCw } from 'react-feather';
import tinycolor from 'tinycolor2';

const DELIVERY_CHARGE = 50;

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Updated this line
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector((state) => state.products);
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [showZoomedView, setShowZoomedView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const imgRef = useRef(null);
  const magnifierSize = 150;
  const ZOOM_LEVEL = 2.5;

  const productFetchId = productId || id;

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProduct({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
      
      const img = new Image();
      img.src = selectedProduct.images[0].url;
      img.onload = () => {
        setSize([img.width, img.height]);
      };
    }
  }, [selectedProduct]);

  useEffect(() => {
    setIsButtonDisabled(!(selectedSize && selectedColor));
  }, [selectedSize, selectedColor]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    
    const elem = imgRef.current;
    const { left, top, width, height } = elem.getBoundingClientRect();

    const target = e.target;
    
    if (target.closest('button') || target.closest('.button-container')) {
      return;
    }
    
    const x = (e.pageX - left - window.pageXOffset) / width;
    const y = (e.pageY - top - window.pageYOffset) / height;
    
    const magnifierX = e.pageX - magnifierSize / 2;
    const magnifierY = e.pageY - magnifierSize / 2;
    
    setXY([x, y]);
    setMagnifierPosition({ x: magnifierX, y: magnifierY });
  };

  const handleMouseEnter = (e) => {
    if (isMobile) return;
    
    if (e.target.closest('button') || e.target.closest('.button-container')) {
      return;
    }
    
    setShowMagnifier(true);
    setShowZoomedView(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setShowMagnifier(false);
    setShowZoomedView(false);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity((prev) => prev - 1);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color before adding to cart.', { duration: 1000 });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => toast.success('Product added to the cart', { duration: 1000 }))
      .finally(() => setIsButtonDisabled(false));
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color before proceeding to checkout.', { duration: 1000 });
      return;
    }
    
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    ).then(() => {
      // Redirect to checkout page
      navigate('/checkout'); // Updated this line
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!', { duration: 1000 });
  };

  const getValidColor = (color) => {
    const normalizedColor = tinycolor(color);
    return normalizedColor.isValid() ? normalizedColor.toHexString() : '#cccccc';
  };

  const handleWishlistToggle = async () => {
    try {
        const token = localStorage.getItem('userToken'); // Get the token from localStorage
        const userId = user?._id; // Get the user ID
        console.log("frontend from details user id", userId);
        console.log("frontend from details product id", productFetchId);
        console.log("frontend from details token", token);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/${userId}/${productFetchId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Use the token from localStorage
            },
            body: JSON.stringify({ productId: productFetchId }), // Ensure the body contains the productId
        });

        if (response.ok) {
            toast.success('Added to wishlist!');
        } else {
            const data = await response.json();
            toast.error(data.msg);
        }
    } catch (error) {
        toast.error('Error adding to wishlist');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-xl">Error: {error}</p>
    </div>
  );

  return (
    <div className="max-w-8xl mx-auto px-4 py-6 sm:py-12">
      {selectedProduct && (
        <>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left: Image Gallery */}
              <div className="lg:w-3/5 p-4 sm:p-8">
                <div className={`flex ${isMobile ? 'flex-col-reverse' : 'flex-row'}`}>
                  {/* Thumbnail Images */}
                  <div className={`flex ${isMobile ? 'flex-row justify-center mt-4' : 'flex-col mr-4'} gap-2 sm:gap-4`}>
                    {selectedProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setMainImage(image.url)}
                        className={`flex-shrink-0 relative w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden transition-all duration-200 ${
                          mainImage === image.url 
                            ? 'ring-2 ring-black scale-105' 
                            : 'hover:ring-2 hover:ring-gray-300'
                        }`}
                      >
                        <img src={image.url} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="relative group flex-1">
                    <div 
                      style={{ 
                        width: '100%', 
                        maxWidth: '600px', 
                        margin: '0 auto',
                        position: 'relative'
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onMouseMove={handleMouseMove}
                    >
                      <img
                        ref={imgRef}
                        src={mainImage}
                        alt="Main Product"
                        className="w-full h-auto rounded-xl shadow-md"
                        style={{ maxHeight: '600px', objectFit: 'contain', cursor: !isMobile ? 'zoom-in' : 'default' }}
                      />

                      {showZoomedView && !isMobile && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '105%',
                            top: '0',
                            width: '70%',
                            height: '70%',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            backgroundImage: `url(${mainImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: `${x * 100}% ${y * 100}%`,
                            backgroundSize: `${ZOOM_LEVEL * 100}%`,
                            pointerEvents: 'none',
                            zIndex: 50,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      )}

                      <div className="button-container absolute top-4 right-4 space-x-2 z-10">
                        <button onClick={handleWishlistToggle} className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" strokeWidth={1.5} />
                        </button>
                        <button 
                          onClick={handleShare}
                          className="p-2 sm:p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                        >
                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Product Info */}
              <div className="lg:w-2/5 p-4 sm:p-8 bg-gray-50">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                        {selectedProduct.name}
                    </h1>
                    {selectedProduct.thrift && (
                        <span className="inline-flex items-center bg-green-600 text-white text-xs font-semibold mr-2 px-3 py-1 rounded-full shadow-lg">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 1a9 9 0 100 18 9 9 0 000-18zm0 16a7 7 0 110-14 7 7 0 010 14z" />
                                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" />
                            </svg>
                            Thrift
                        </span>
                    )}
                    <p className="text-gray-600 text-base sm:text-lg">{selectedProduct.description}</p>
                  </div>

                  <div className="border-t border-b py-4">
                    <div className="flex items-baseline gap-4">
                      <span className="text-2xl sm:text-3xl font-bold text-gray-900">₹{selectedProduct.discountPrice}</span>
                      {selectedProduct.price && (
                        <span className="text-lg sm:text-xl text-gray-500 line-through">₹{selectedProduct.price}</span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">+ ₹{DELIVERY_CHARGE} Delivery Charge</p>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2 sm:mb-3">Select Color</label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {selectedProduct.colors.map((color) => {
                        const validColor = getValidColor(color);
                        return (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full transition-transform duration-200 ${
                              selectedColor === color 
                                ? 'ring-2 ring-offset-2 ring-black scale-110' 
                                : 'hover:scale-105'
                            }`}
                            style={{ backgroundColor: validColor }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2 sm:mb-3">Select Size</label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
                            selectedSize === size 
                              ? 'bg-black text-white scale-105' 
                              : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2 sm:mb-3">Quantity</label>
                    <div className="flex items-center gap-3 sm:gap-4 bg-white rounded-lg w-fit p-2 border">
                      <button 
                        onClick={decreaseQuantity}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <span className="text-lg sm:text-xl font-medium w-8 sm:w-12 text-center">{quantity}</span>
                      <button 
                        onClick={increaseQuantity}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart and Buy Now Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleAddToCart}
                      disabled={isButtonDisabled}
                      className={`w-full py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg font-medium transition-all duration-200 ${
                        isButtonDisabled 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : 'bg-black text-white hover:bg-gray-900'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      disabled={isButtonDisabled}
                      className={`w-full py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg font-medium transition-all duration-200 ${
                        isButtonDisabled 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                      Buy Now
                    </button>
                  </div>

                  {/* Delivery Info */}
                  <div className="space-y-2 sm:space-y-3 pt-4">
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
                      <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Free delivery on orders above ₹999</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">30 days return policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products */}
          {similarProducts?.length > 0 && (
            <div className="mt-8 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">You May Also Like</h2>
              <ProductGrid products={similarProducts} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
