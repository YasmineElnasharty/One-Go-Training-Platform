'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Category } from '@/types';
import {
  Car, Building2, Diamond, Hotel, Store,
  Utensils, Truck, Heart, Landmark,
  ArrowLeft, Search
} from 'lucide-react';
import React, { useState } from 'react';

export default function CategoriesPage() {
  const router = useRouter();
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategoryState] = useState<string | null>(null);

  const categories: Category[] = [
    { id: 'auto', name: 'Automotive', icon: Car, subcategories: [], description: 'Training for automotive sales and service professionals' },
    { id: 'finance', name: 'Finance', icon: Building2, subcategories: [], description: 'Financial services and banking sector training' },
    { id: 'luxury', name: 'Luxury', icon: Diamond, subcategories: [], description: 'High-end retail and luxury goods training' },
    { id: 'hospitality', name: 'Hospitality', icon: Hotel, subcategories: [], description: 'Hotel and tourism industry training' },
    { id: 'retail', name: 'Retail', icon: Store, subcategories: [], description: 'Retail sales and management training' },
    { id: 'restaurants', name: 'Restaurants', icon: Utensils, subcategories: [], description: 'Food service and restaurant management' },
    { id: 'logistics', name: 'Logistics', icon: Truck, subcategories: [], description: 'Supply chain and logistics training' },
    { id: 'health', name: 'Healthcare', icon: Heart, subcategories: [], description: 'Healthcare and medical services training' },
    { id: 'government', name: 'Government', icon: Landmark, subcategories: [], description: 'Public sector and government training' },
  ];

  const handleCategorySelect = (category: Category) => {
    setSelectedCategoryState(category.id);
    setTimeout(() => {
      setSelectedCategory(category);
      router.push('/subcategories');
    }, 400);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back to Home</span>
      </motion.button>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative p-8"
        >
          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-black rounded-full blur-3xl"
          />

          {/* Main heading with gradient text */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold mb-6 relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-black">Choose Your</span>
            {" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">Industry</span>
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-black via-green-500 to-black mx-auto mb-6"
          />

          {/* Description with enhanced styling */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Select your industry to access specialized
            <span className="text-green-500 font-semibold"> AI-powered training modules </span>
            tailored to your sectors unique needs and challenges.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-12 relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search industries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          />
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <motion.div
                key={category.id}
                variants={item}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <motion.button
                  onClick={() => handleCategorySelect(category)}
                  animate={isSelected ? { scale: 0.95 } : { scale: 1 }}
                  className={`w-full h-full p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all ${isSelected ? 'border-2 border-green-500' : ''
                    }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4"
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="mt-auto"
                    >
                      <span className="inline-flex items-center text-green-500 font-medium text-sm">
                        Explore Modules
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </motion.div>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
}