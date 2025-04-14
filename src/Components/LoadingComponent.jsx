import React from "react";
import { motion } from "framer-motion";

const Shimmer = () => (
  <motion.div
    className="absolute top-0 left-[-50%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
    animate={{ left: ["-50%", "100%"] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
  />
);

const LoadingComponent = () => {
  return (
    <div className="min-h-screen bg-gray-100 space-y-6 p-4">
      {/* Navbar Skeleton */}
      <div className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full relative overflow-hidden">
            <Shimmer />
          </div>
          <div className="w-24 h-4 bg-gray-300 rounded relative overflow-hidden">
            <Shimmer />
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-300 rounded-full relative overflow-hidden">
          <Shimmer />
        </div>
      </div>

      {/* Single Post Skeleton */}
      <div className="bg-white p-4 space-y-4 rounded-xl shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full relative overflow-hidden">
            <Shimmer />
          </div>
          <div className="flex-1 space-y-2">
            <div className="w-1/3 h-4 bg-gray-300 rounded relative overflow-hidden">
              <Shimmer />
            </div>
            <div className="w-1/4 h-3 bg-gray-200 rounded relative overflow-hidden">
              <Shimmer />
            </div>
          </div>
        </div>
        <div className="w-full h-4 bg-gray-300 rounded relative overflow-hidden">
          <Shimmer />
        </div>
        <div className="w-full h-64 bg-gray-200 rounded-xl relative overflow-hidden">
          <Shimmer />
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
