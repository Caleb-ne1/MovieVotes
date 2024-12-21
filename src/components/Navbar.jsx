import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import supabase from '../supabase/client';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlelogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error.message);
        return;
      }
      
      window.location.href = '/';
    } catch (err) {
      console.error("Unexpected error during sign out:", err);
    }
  } 

  return (
    <nav className="z-50 text-white bg-gray-800 shadow-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="focus:outline-none"
            aria-label="Open Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="/home">MovieVotes</a>
        </div>

        {/* Links for larger screens */}
        <div
          className={`hidden md:flex space-x-6 ${isMenuOpen ? "block" : ""}`}
        >
          <a href="/home" className="hover:text-gray-300">
            Home
          </a>
          <a href="/movies" className="hover:text-gray-300">
            Movies
          </a>

          <a href="/movies/vote" className="hover:text-gray-300">
            Voting Page
          </a>
        </div>

        {/* User Profile and Menu */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center space-x-2 hover:text-gray-300"
          >
            <FaRegUserCircle className="icon_profile" />
          </button>
          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 z-50 mt-2 bg-gray-700 rounded shadow-lg">
              <a
                href="/profile"
                className="block w-40 px-4 py-2 hover:bg-gray-600"
              >
                My Profile
              </a>
              
              <a
                onClick={handlelogout}
                className="block px-4 py-2 text-red-500 hover:bg-gray-600"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="px-4 py-2 space-y-2 text-white bg-gray-800 md:hidden">
          <a
            href="/home"
            className="block hover:text-gray-300 transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/movies"
            className="block hover:text-gray-300 transition-colors duration-300"
          >
            Movies
          </a>
          <a
            href="/movies/vote"
            className="block hover:text-gray-300 transition-colors duration-300"
          >
            Voting Page
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
