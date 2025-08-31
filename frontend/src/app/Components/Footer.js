"use client";
import React, { useState } from "react";
import logo from "../Assets/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
    const [showContact, setShowContact] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    return (
        <motion.footer 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-12 px-6 md:px-16 border-t "
            style={{
                background: "linear-gradient(to left, #000000, #000000,rgb(33, 3, 42))", // Black to Navy Blue to Purple Gradient
            }}
        >
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Logo & Description */}
                <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center md:items-start">
                    <Image className="w-32" src={logo} alt="logo" />
                    <span className="text-2xl font-bold text-[#b3a4ff] mt-3">Neural Security</span>
                    <p className="mt-4 text-sm text-gray-300 text-center md:text-left">
                        AI-powered surveillance isn’t the future, it’s the present. Upgrade your security
                        systems with real-time suspect identification and instant alerts.
                    </p>
                </motion.div>

                {/* Quick Links */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-[#b3a4ff] mb-5">Quick Links</h3>
                    <ul className="space-y-3 text-white">
                        <motion.li whileHover={{ scale: 1.1 }}><Link className="hover:text-[#6b4eff] transition" href="/">Home</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1 }}><Link className="hover:text-[#6b4eff] transition" href="/survellance">Surveillance</Link></motion.li>
                        <motion.li whileHover={{ scale: 1.1 }}>
                            <button className="hover:text-[#6b4eff] transition" onClick={() => setShowAbout(!showAbout)}>About Us</button>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.1 }}>
                            <button className="hover:text-[#6b4eff] transition" onClick={() => setShowContact(!showContact)}>Contact Us</button>
                        </motion.li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-[#b3a4ff] mb-5">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-5 text-white">
                        <motion.div whileHover={{ scale: 1.2 }}><Link href="#" className="hover:text-[#6b4eff] transition"><Facebook size={28} /></Link></motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}><Link href="#" className="hover:text-[#6b4eff] transition"><Twitter size={28} /></Link></motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}><Link href="#" className="hover:text-[#6b4eff] transition"><Linkedin size={28} /></Link></motion.div>
                        <motion.div whileHover={{ scale: 1.2 }}><Link href="#" className="hover:text-[#6b4eff] transition"><Instagram size={28} /></Link></motion.div>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            {showAbout && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 p-6 rounded-lg shadow-md max-w-3xl mx-auto"
                    style={{ background: "linear-gradient(to left,rgb(14, 14, 30), #1a1a40,rgb(63, 3, 75))" }} // Black to Navy Blue to Purple Gradient
                >
                    <h3 className="text-2xl font-semibold text-[#b3a4ff] mb-4 text-center">About Us</h3>
                    <p className="text-sm text-gray-300 text-center">
                        At Neural Security, we leverage AI-powered surveillance technology to provide
                        real-time crime detection and suspect identification, making the world a safer place.
                    </p>
                </motion.div>
            )}

            {/* Contact Us Section */}
            {showContact && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-12 p-6 rounded-lg shadow-md max-w-3xl mx-auto"
                    style={{ background: "linear-gradient(to left, rgb(14, 14, 30), #1a1a40,rgb(54, 2, 63))" }} // Black to Navy Blue to Purple Gradient
                >
                    <h3 className="text-2xl font-semibold text-[#b3a4ff] mb-4 text-center">Get in Touch</h3>
                    <p className="text-sm text-gray-300 text-center mb-4">We'd love to hear from you! Fill out the form below or reach us via email.</p>
                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-[#6b4eff]" required />
                        <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-[#6b4eff]" required />
                        <textarea placeholder="Your Message" className="w-full px-4 py-2 rounded-md bg-gray-900 text-white focus:ring-2 focus:ring-[#6b4eff]" rows="4" required></textarea>
                        <button type="submit" className="w-full py-2 bg-[#6b4eff] text-white rounded-md hover:bg-[#3b0076] transition">Send Message</button>
                    </form>
                </motion.div>
            )}

            {/* Copyright Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 border-t border-gray-500 pt-5 text-center text-sm text-gray-300"
            >
                © 2025 <span className="font-semibold text-[#b3a4ff]">Neural Security</span>. All Rights Reserved.
            </motion.div>
        </motion.footer>
    );
};

export default Footer;
