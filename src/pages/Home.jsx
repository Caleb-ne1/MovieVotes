import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, settrendingmovies] = useState([]);

  const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  //fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };


    fetchMovies();
  }, [API_KEY]);

  //to get trending movies
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response =
          await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}
`);
        settrendingmovies(response.data.results);
      } catch (error) {}
    };
    fetchTrendingMovies();
  }, [API_KEY])

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-6">
        {/* trending movie section  */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Trending Movies
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {trendingMovies.map((trendingmovie) => (
            <div
              key={trendingmovie.id}
              className="bg-gray-100 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <Link to={`/movie/${trendingmovie.id}`} className="group">
                <div className="relative">
                  <img
                    src={`${imageBaseURL}${trendingmovie.poster_path}`}
                    alt={trendingmovie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <p className="text-white font-semibold text-sm px-2 text-center">
                      View Details
                    </p>
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700 truncate">
                  {trendingmovie.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Release Date:{" "}
                  {new Date(trendingmovie.release_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* popular movie section */}
        <h2 className="text-xl font-semibold mb-4 pt-5">Popular Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`${imageBaseURL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-60 object-cover"
                />
              </Link>
              <div className="p-3">
                <h3 className="text-lg font-medium truncate">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
