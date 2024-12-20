'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Skill } from '@/types';
import {
  Smile, Anchor, ShieldCheck, Zap, TrendingUp,
  ArrowLeft, Search, Clock, Star
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function SkillsPage() {
  const router = useRouter();
  const selectedSubcategory = useStore((state) => state.selectedSubcategory);
  const setSelectedSkill = useStore((state) => state.setSelectedSkill);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkillState, setSelectedSkillState] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    {
      id: 'welcoming',
      name: 'Customer Welcome',
      icon: Smile,
      description: 'Master the art of first impressions and create memorable welcome experiences',
      prompt: 'You are an expert in customer welcoming techniques...',
      category: 'customer-engagement',
      subcategory: 'greetings',
      duration: '45 mins',
      difficulty: 'Beginner'
    },
    {
      id: 'hooks',
      name: 'Engagement Hooks',
      icon: Anchor,
      description: 'Learn powerful techniques to capture and maintain customer interest',
      prompt: 'You are a specialist in sales hooks...',
      category: 'sales',
      subcategory: 'opening-lines',
      duration: '60 mins',
      difficulty: 'Intermediate'
    },
    {
      id: 'product-presentation',
      name: 'Product Showcase',
      icon: ShieldCheck,
      description: 'Transform features into benefits that resonate with customers',
      prompt: 'You are a product presentation expert...',
      category: 'sales',
      subcategory: 'product-presentation',
      duration: '75 mins',
      difficulty: 'Advanced'
    },
    {
      id: 'objection-handling',
      name: 'Objection Mastery',
      icon: ShieldCheck,
      description: 'Turn customer concerns into opportunities for connection',
      prompt: 'You are an expert in handling sales objections...',
      category: 'sales',
      subcategory: 'objections',
      duration: '90 mins',
      difficulty: 'Advanced'
    },
    {
      id: 'closing-techniques',
      name: 'Closing Excellence',
      icon: Zap,
      description: 'Master the art of securing successful sales outcomes',
      prompt: 'You are a sales closing specialist...',
      category: 'sales',
      subcategory: 'closing',
      duration: '60 mins',
      difficulty: 'Expert'
    },
    {
      id: 'upselling',
      name: 'Value Enhancement',
      icon: TrendingUp,
      description: 'Discover strategies to maximize value for both customer and business',
      prompt: 'You are an upselling and cross-selling expert...',
      category: 'sales',
      subcategory: 'upselling',
      duration: '45 mins',
      difficulty: 'Intermediate'
    },
  ];

  const handleSkillSelect = (skill: Skill) => {
    setSelectedSkillState(skill.id);
    setTimeout(() => {
      setSelectedSkill(skill);
      router.push('/chat');
    }, 400);
  };

  useEffect(() => {
    if (!selectedSubcategory) {
      console.warn('No subcategory selected. Redirecting to /subcategories.');
      router.push('/subcategories');
    }
  }, [selectedSubcategory, router]);

  if (!selectedSubcategory) return null;

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

  const getDifficultyColor = (difficulty: string): string => {
    const colors: Record<Difficulty, string> = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-orange-100 text-orange-700',
      'Expert': 'bg-red-100 text-red-700'
    };
    return colors[difficulty as Difficulty] || colors['Beginner'];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Unique Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back to Subcategories</span>
      </motion.button>

      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-gray-600">
            Select a skill to start your personalized AI-powered training journey. Each module is designed to enhance your professional capabilities.
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-lg mx-auto mb-12 relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
            />
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;
              const isSelected = selectedSkillState === skill.id;
              const isHovered = hoveredSkill === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredSkill(skill.id)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <motion.button
                    onClick={() => handleSkillSelect(skill)}
                    animate={isSelected ? { scale: 0.95 } : { scale: 1 }}
                    className={`w-full text-left p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${isSelected ? 'border-green-500' : 'border-transparent'
                      }`}
                  >
                    <div className="relative">
                      {/* Icon with rotating background on hover */}
                      <motion.div
                        animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4"
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Skill Information */}
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {skill.name}
                      </h3>

                      <p className="text-gray-600 mb-4">
                        {skill.description}
                      </p>

                      {/* Metadata Row */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock size={16} />
                          <span>{skill.duration}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(skill.difficulty)}`}>
                          {skill.difficulty}
                        </div>
                      </div>

                      {/* Start Button - Appears on Hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute top-4 right-4"
                      >
                        <div className="flex items-center text-green-500">
                          <span className="mr-2">Start</span>
                          <Star size={16} className="fill-current" />
                        </div>
                      </motion.div>
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