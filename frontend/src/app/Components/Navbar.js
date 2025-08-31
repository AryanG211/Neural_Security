"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Surveillance", href: "/survellance" },
    ];

    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-10 py-4 flex justify-center items-center gap-x-10 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-navy black/80 to-black/80 "
        >
            {/* Logo Section */}
            <motion.div 
                whileHover={{ scale: 1.1 }} 
                onClick={() => router.push("/")} 
                className="flex items-center cursor-pointer space-x-4"
            > 
                <Image src={logo} alt="Logo" width={40} height={0} />
                <span className="text-white text-3xl font-bold tracking-wide">Neural Security</span>
            </motion.div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10 text-lg font-medium text-white">
                {navLinks.map((link) => (
                    <motion.div key={link.href} whileHover={{ scale: 1.1 }}>
                        <Link
                            href={link.href}
                            className={`relative py-2 px-6 transition duration-300 hover:text-purple-400 ${
                                pathname === link.href ? "text-purple-500 border-b-2 border-purple-500" : ""
                            }`}
                        >
                            {link.name}
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.div className="md:hidden text-white" whileHover={{ scale: 1.2 }}>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </motion.div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden fixed inset-0 bg-black/90 flex flex-col items-center justify-center space-y-6 text-white text-2xl font-semibold shadow-lg"
                >
                    {navLinks.map((link) => (
                        <motion.div key={link.href} whileHover={{ scale: 1.1 }}>
                            <Link
                                href={link.href}
                                className="py-2 px-8 hover:text-purple-400 transition duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;