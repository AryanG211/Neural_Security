"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const Banner = ({ imgbackgound, heading, sub1, sub2 }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isSurvelliance = pathname === "/survellance";

  const handleClick = () => {
    router.push(isSurvelliance ? "/" : "/survellance");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          src={imgbackgound}
          alt="Banner Background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90"
      />

      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center text-white px-10 max-w-4xl"
      >
        <h1 className="text-6xl pd-7 font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 drop-shadow-[4px_6px_2px_purple]">
          {heading}
        </h1>
        <p className="text-2xl text-white-300 mb-8 drop-shadow-[4px_6px_2px_purple]">
          {sub1}
        </p>
        <p className="text-1xl text-gray-400 mb-10 pd-5 drop-shadow-[4px_6px_2px_purple]">
          {sub2}
        </p>
        <button
          onClick={handleClick}
          className="cursor-pointer px-5 py-2 border-2 border-white text-white rounded hover:bg-white hover:text-black transition-colors duration-300"
        >
          {isSurvelliance ? "Go to Home Page" : "Go to Survelliance Page"}
        </button>
      </motion.div>
    </div>
  );
};

export default Banner;