import React, { useEffect, useState } from 'react';
import { Award, TrendingUp } from 'react-feather';
import Banner from '../components/Layout/Banner';
import GenderCollectionSection from '../components/Products/GenderCollectionSection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturesSection from '../components/Products/FeaturesSection';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';
import axios from 'axios';
import Team from '../components/portfolio/Team';
import Hero from '../components/Layout/Hero';
import Testimonials from '../components/Common/Testimonials';
import Thriftstore from '../components/Common/Thrift';
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products for the "Top Wears for Women's" section
    dispatch(
      fetchProductsByFilters({
        gender: 'Women',
        category: 'Top Wear',
        limit: 8,
      })
    );
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      <Hero />
      <Banner />
      <Team  />
      <NewArrivals />
      <Thriftstore />

    

      {/* Top Wears for Women's Section */}
      {/* <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-center">Top Wears for Women's</h2>
        </div>
        <ProductGrid products={products} loading={loading} error={error} />
      </div> */}

      <FeaturedCollection />
     
      <FeaturesSection />
     
      <Testimonials />
    </div>
  );
};

export default Home;