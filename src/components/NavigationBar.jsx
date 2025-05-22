'use client'
import React from 'react'
import Link from 'next/link';
import dynamic from 'next/dynamic';
import GooeyNav from './GooeyNav/GooeyNav';
import { useState } from 'react';

const ThemeSwitcher = dynamic(() => import("../components/ThemeSwitcher"), {
    ssr: false,
});

const NavigationBar = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const items = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <div className="w-full bg-slate-950 px-4 md:px-20 py-4 relative ">
            <div className="flex md:flex-row items-center justify-between gap-4">
                <Link href="/" className="flex items-center gap-2 text-white text-xl">
                    Ansh Sharma
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex w-full md:w-auto justify-center">
                    <GooeyNav
                        items={items}
                        animationTime={600}
                        pCount={4}
                        minDistance={20}
                        maxDistance={42}
                        maxRotate={40}
                        colors={[1, 3, 5, 1, 2, 1, 29, 4]}
                        timeVariance={300}
                    />
                </div>

                {/* Mobile hamburger */}
                <div className="md:hidden text-white">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open menu"
                        className="flex flex-col gap-1"
                    >
                        <span className="w-6 h-0.5 bg-white"></span>
                        <span className="w-6 h-0.5 bg-white"></span>
                        <span className="w-6 h-0.5 bg-white"></span>
                    </button>
                </div>

                {/* Desktop CTA */}
                <div className="text-white hidden md:block">
                    <p>Buy Me A Coffee</p>
                </div>
            </div>

            {/* Mobile sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-end">
                    <div className="w-64 bg-slate-900 h-full p-4 text-white flex flex-col gap-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Menu</h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                aria-label="Close menu"
                                className="text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="hover:text-green-400"
                                onClick={() => setSidebarOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="mt-auto">
                            <p>Buy Me A Coffee</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavigationBar
