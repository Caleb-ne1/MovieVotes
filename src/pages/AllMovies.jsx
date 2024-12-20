import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
impor
const AllMovies = () => {
  const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //fetch movies, search query
  const fetchMovies = async (searchQuery = "", pageNumber = 1) => {
    const endpoint = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNumber}`
      : `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${pageNumber}`;
    try {
      const response = await axios.get(endpoint);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(query, page);
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); 
    fetchMovies(query);
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-6">

        {/* search */}
        <form onSubmit={handleSearch} className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <Link to={`/movie/${movie.id}`}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700 truncate">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Release Date:{" "}
                  {movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={page === 1}
            className={`px-4 py-2 rounded-l-lg bg-gray-200 hover:bg-gray-300 ${
              page === 1 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 border border-gray-300">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-r-lg bg-gray-200 hover:bg-gray-300 ${
              page === totalPages && "opacity-50 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
