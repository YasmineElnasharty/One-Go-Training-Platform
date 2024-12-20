'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Subcategory } from '@/types';
import {
  Users, UserCog, Briefcase, Palette, UserPlus, Eye, UserCheck,
  ArrowLeft, Search, ChevronRight, Sparkles
} from 'lucide-react';
import React from 'react';

export default function SubcategoriesPage() {
  const router = useRouter();
  const selectedCategory = useStore((state) => state.selectedCategory);
  const setSelectedSubcategory = useStore((state) => state.setSelectedSubcategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const subcategories: (Subcategory & { description: string, level: string })[] = [
    {
      id: 'sales',
      name: 'Sales Associate',
      icon: Users,
      skills: [],
      description: 'Master customer engagement and sales techniques',
      level: 'Entry Level'
    },
    {
      id: 'manager',
      name: 'Store Manager',
      icon: UserCog,
      skills: [],
      description: 'Lead teams and optimize store operations',
      level: 'Senior Level'
    },
    {
      id: 'customer-service',
      name: 'Customer Service',
      icon: UserCog,
      skills: [],
      description: 'Excel in customer satisfaction and support',
      level: 'Entry Level'
    },
    {
      id: 'operations',
      name: 'Operations Manager',
      icon: Briefcase,
      skills: [],
      description: 'Streamline processes and enhance efficiency',
      level: 'Senior Level'
    },
    {
      id: 'beauty',
      name: 'Beauty Consultant',
      icon: Palette,
      skills: [],
      description: 'Provide expert beauty advice and services',
      level: 'Intermediate'
    },
    {
      id: 'assistant',
      name: 'Assistant Manager',
      icon: UserPlus,
      skills: [],
      description: 'Support management and team leadership',
      level: 'Intermediate'
    },
    {
      id: 'merchandiser',
      name: 'Visual Merchandiser',
      icon: Eye,
      skills: [],
      description: 'Create compelling visual displays',
      level: 'Intermediate'
    },
    {
      id: 'advisor',
      name: 'Client Advisor',
      icon: UserCheck,
      skills: [],
      description: 'Deliver personalized client solutions',
      level: 'Senior Level'
    },
  ];

  const handleSubcategorySelect = (subcategory: Subcategory) => {
    setSelectedRole(subcategory.id);
    setTimeout(() => {
      setSelectedSubcategory(subcategory);
      router.push('/skills');
    }, 400);
  };

  useEffect(() => {
    if (!selectedCategory) {
      router.push('/categories');
    }
  }, [selectedCategory, router]);

  if (!selectedCategory) return null;

  const filteredSubcategories = subcategories.filter(subcategory =>
    subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subcategory.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Animated Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back to Categories</span>
      </motion.button>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-green-500" size={24} />
            <h1 className="text-4xl font-bold text-gray-900">
              Select Your Role
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your specific role to access personalized AI training modules designed for your professional development journey.
          </p>
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
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-green-100 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all shadow-sm"
          />
        </motion.div>

        {/* Subcategories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence>
            {filteredSubcategories.map((subcategory, index) => {
              const Icon = subcategory.icon;
              const isSelected = selectedRole === subcategory.id;

              return (
                <motion.div
                  key={subcategory.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <motion.button
                    onClick={() => handleSubcategorySelect(subcategory)}
                    className={`w-full text-left p-6 rounded-xl transition-all shadow-lg ${isSelected
                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white'
                        : 'bg-white hover:bg-green-50'
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-green-100'
                          }`}
                      >
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-green-600'}`} />
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                            {subcategory.name}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-green-600 text-white'
                            }`}>
                            {subcategory.level}
                          </span>
                        </div>

                        <p className={`text-sm mb-4 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                          {subcategory.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-green-600'
                            }`}>
                            View Modules
                          </span>
                          <ChevronRight size={16} className={isSelected ? 'text-white' : 'text-green-600'} />
                        </div>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}