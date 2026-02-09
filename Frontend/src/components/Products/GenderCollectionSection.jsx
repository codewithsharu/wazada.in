import React from 'react';
import menCollectionImage from "../../assets/mens-collection.webp";
import womenCollectionImage from "../../assets/womens-collection.webp";
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Clock } from 'react-feather';

const GenderCollectionSection = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}

        {/* Collections Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Women's Collection */}
          <Link to="/collections/all?gender=Women" className="group relative overflow-hidden rounded-3xl shadow-2xl block">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Women's Collection" 
                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
              <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out w-full flex flex-col items-center">
              
                <h3 className="text-4xl font-playfair font-bold text-white mb-6 tracking-wide text-center">
                  WOMEN'S COLLECTION
                </h3>
              </div>
            </div>
          </Link>

          {/* Men's Collection */}
          <Link to="/collections/all?gender=Men" className="group relative overflow-hidden rounded-3xl shadow-2xl block">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Men's Collection" 
                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
              <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out w-full flex flex-col items-center">
              
                <h3 className="text-4xl font-playfair font-bold text-white mb-6 tracking-wide text-center">
                  MEN'S COLLECTION
                </h3>
              </div>
            </div>
          </Link>

          {/* Kids Collection */}
          <Link to="/collections/all?gender=Kids" className="group relative overflow-hidden rounded-3xl shadow-2xl block">
            <div className="aspect-[3/4] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Kids Collection" 
                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
              <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out w-full flex flex-col items-center">
              
                <h3 className="text-4xl font-playfair font-bold text-white mb-6 tracking-wide text-center">
                  KIDS' COLLECTION
                </h3>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex flex-col items-center">
              <div className="bg-black/5 p-2 rounded-2xl mb-4">
                <Truck className="w-8 h-8 text-black group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm text-gray-900">Delivery</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex flex-col items-center">
              <div className="bg-black/5 p-2 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-black group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm text-gray-900">Secure</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex flex-col items-center">
              <div className="bg-black/5 p-2 rounded-2xl mb-4">
                <Star className="w-8 h-8 text-black group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm text-gray-900">Quality</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex flex-col items-center">
              <div className="bg-black/5 p-2 rounded-2xl mb-4">
                <Clock className="w-8 h-8 text-black group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm text-gray-900">Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;