"use client";

import React, { useState } from "react";
import { ListTodo, Menu, X } from "lucide-react";

interface NavbarProps {
  onLogin: () => void;
  onSignup: () => void;
}

const Navbar = ({ onLogin, onSignup }: NavbarProps) => {
  const [mobileMenu, setMobileMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 sm:h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2.5">

            {/* Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-sm">
              <ListTodo size={22} />
            </div>

            {/* Logo Text */}
            <div>
              <h1 className="font-bold text-gray-900 text-lg leading-none">
                Steps
                <span className="text-orange-500">
                  TaskFlow
                </span>
              </h1>

              <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                Team Management
              </p>
            </div>

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <a
              href="#home"
              className="text-sm font-medium text-gray-700 hover:text-orange-500 transition"
            >
              Home
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-gray-700 hover:text-orange-500 transition"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-gray-700 hover:text-orange-500 transition"
            >
              About
            </a>

          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">

            {/* Login */}
            <button
              onClick={() => {
                window.scrollTo({
                top: 0,
                behavior: "smooth",
                });

                setTimeout(() => {
                onLogin();
                }, 500);
            }}
              className="
                flex
                items-center
                justify-center
                px-5
                py-2.5
                rounded-xl
                bg-orange-500
                hover:bg-orange-600
                text-white
                text-sm
                font-semibold
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
              "
            >
              Login
            </button>

            {/* Sign Up */}
            <button
              onClick={() => {
                window.scrollTo({
                top: 0,
                behavior: "smooth",
                });

                setTimeout(() => {
                onSignup();
                }, 500);
            }}
              className="
                flex
                items-center
                justify-center
                px-5
                py-2.5
                rounded-xl
                border
                border-orange-500
                text-orange-500
                bg-white
                hover:bg-orange-50
                text-sm
                font-semibold
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
              "
            >
              Sign Up
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="
              md:hidden
              w-10
              h-10
              rounded-xl
              bg-gray-100
              flex
              items-center
              justify-center
              text-gray-700
              hover:bg-orange-50
              hover:text-orange-500
              transition
            "
          >
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">

            {/* Home */}
            <a
              href="#home"
              onClick={() => setMobileMenu(false)}
              className="
                block
                px-4
                py-3
                rounded-lg
                text-sm
                font-medium
                text-gray-700
                hover:bg-orange-50
                hover:text-orange-500
                transition
              "
            >
              Home
            </a>

            {/* Features */}
            <a
              href="#features"
              onClick={() => setMobileMenu(false)}
              className="
                block
                px-4
                py-3
                rounded-lg
                text-sm
                font-medium
                text-gray-700
                hover:bg-orange-50
                hover:text-orange-500
                transition
              "
            >
              Features
            </a>

            {/* About */}
            <a
              href="#about"
              onClick={() => setMobileMenu(false)}
              className="
                block
                px-4
                py-3
                rounded-lg
                text-sm
                font-medium
                text-gray-700
                hover:bg-orange-50
                hover:text-orange-500
                transition
              "
            >
              About
            </a>

            {/* Mobile Login */}
            <button
              onClick={() => {
                setMobileMenu(false);
                onLogin();
              }}
              className="
                w-full
                mt-2
                bg-orange-500
                hover:bg-orange-600
                text-white
                py-3
                rounded-xl
                font-semibold
                text-sm
                transition
              "
            >
              Login
            </button>

            {/* Mobile Sign Up */}
            <button
              onClick={() => {
                setMobileMenu(false);
                onSignup();
              }}
              className="
                w-full
                mt-2
                border
                border-orange-500
                text-orange-500
                bg-white
                hover:bg-orange-50
                py-3
                rounded-xl
                font-semibold
                text-sm
                transition
              "
            >
              Sign Up
            </button>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;