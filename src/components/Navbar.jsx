import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
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
          <a href="/">MovieVotes</a>
        </div>

        {/* Links for larger screens */}
        <div
          className={`hidden md:flex space-x-6 ${isMenuOpen ? "block" : ""}`}
        >
          <a href="/" className="hover:text-gray-300">
            Home
          </a>
          <a href="/movies" className="hover:text-gray-300">
            Movies
          </a>

          <a href="/movies" className="hover:text-gray-300">
            vote arena
          </a>

          <a href="/create" className="hover:text-gray-300">
            Create Poll
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search movies or polls..."
            className="px-4 py-2 rounded bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            <div className="absolute right-0 mt-2 bg-gray-700 rounded shadow-lg">
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-600">
                My Profile
              </a>
              <a href="/votes" className="block px-4 py-2 hover:bg-gray-600">
                My Votes
              </a>
              <a href="/settings" className="block px-4 py-2 hover:bg-gray-600">
                Settings
              </a>
              <a
                href="/logout"
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
        <div className="md:hidden bg-gray-800 text-white space-y-2 px-4 py-2">
          <a href="/" className="block hover:text-gray-300">
            Home
          </a>
          <a href="/polls" className="block hover:text-gray-300">
            Movies
          </a>

          <a href="/movies" className="hover:text-gray-300">
            vote arena
          </a>

          <a href="/create" className="block hover:text-gray-300">
            Create Poll
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
