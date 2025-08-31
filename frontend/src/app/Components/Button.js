"use client";
import { motion } from "framer-motion";
import React from "react";

const Button = ({titel}) => {
    return (


<motion.button 
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.9 }}
className="px-8 py-3 rounded-md text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 border-2 border-white shadow-lg hover:shadow-purple-500/50 transition"
>
{titel}
</motion.button>

    )
}

export default Button;