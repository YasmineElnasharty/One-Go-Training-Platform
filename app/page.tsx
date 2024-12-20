'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronDown, Brain, Rocket, Target, Users, Shield } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const setUserDetails = useStore((state) => state.setUserDetails);
  const [showFeatures, setShowFeatures] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning Paths",
      description: "Personalized learning journeys adapted to each employee&apos;s pace and style"
    },
    {
      icon: Target,
      title: "Skill Gap Analysis",
      description: "Advanced analytics to identify and bridge professional development needs"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Interactive team sessions and peer-to-peer knowledge sharing"
    },
    {
      icon: Users,
      title: "Progress Tracking",
      description: "Real-time metrics and performance insights for measurable growth"
    },
    {
      icon: Shield,
      title: "Compliance Training",
      description: "Automated compliance tracking and certification management"
    },
    {
      icon: Rocket,
      title: "Rapid Skill Development",
      description: "Accelerated learning through AI-optimized content delivery"
    }
  ];


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userDetails = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
    };
    setUserDetails(userDetails);
    router.push('/categories');
  };

  const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
      <input
        ref={ref}
        className={`border-2 border-gray-200 p-3 rounded-lg w-full focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 transform hover:scale-102 ${className}`}
        {...props}
      />
    )
  );

  Input.displayName = 'Input';


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 w-full z-50"
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="ONEGO Logo" width={120} height={40} priority className="h-8 w-auto" />
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-green-500 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-green-500 transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-green-500 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 px-4 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -right-64 -top-64 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -left-64 -bottom-64 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"
        />

        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Column - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left space-y-8"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Your{" "}
              <span className="text-green-500">Corporate Training</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Elevate your team&apos;s potential with our{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">AI-powered</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-2 bg-green-200"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                </span>
                {" "}learning platform.
              </p>
              <p className="text-lg md:text-xl text-gray-500 mt-4">
                Personalized, efficient, and engaging training solutions.
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.button
                onClick={() => setShowFeatures(!showFeatures)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Features
                <motion.div
                  animate={{ rotate: showFeatures ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>

              {/* Features Dropdown */}
              <AnimatePresence>
                {showFeatures && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                      {features.map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                            <feature.icon className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-gray-900 font-semibold mb-1">{feature.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started Today</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Company</label>
                  <Input
                    name="company"
                    type="text"
                    placeholder="Your company name"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300"
                >
                  Start Free Trial
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}