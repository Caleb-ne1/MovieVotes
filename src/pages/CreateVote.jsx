import React, { useState } from "react";
import axios from "axios";

const CreateVote = () => {
  const [voteName, setVoteName] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;
  const imageBaseURL = "https://image.tmdb.org/t/p/w200";


  //handle search
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=1`
      );

      // limit results to 5
      setSearchResults(response.data.results.slice(0, 5));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const addMovie = (movie) => {
    if (selectedMovies.length >= 5)
      return alert("You can only add up to 5 movies.");
    if (selectedMovies.find((m) => m.id === movie.id))
      return alert("Movie already added.");
    setSelectedMovies([...selectedMovies, movie]);
  };

  //remove a movie
  const removeMovie = (movieId) => {
    setSelectedMovies(selectedMovies.filter((movie) => movie.id !== movieId));
  };

  const handleSubmit = () => {
    if (!voteName) return alert("Please enter a name for the vote.");
    if (selectedMovies.length === 0)
      return alert("Please add at least one movie.");

    const voteData = {
      name: voteName,
      movies: selectedMovies,
    };
    console.log("Vote Created:", voteData);
    alert("Vote successfully created!");
    setVoteName("");
    setSelectedMovies([]);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">Create a New Vote</h1>

      <div className="mb-4">
        <label htmlFor="voteName" className="block mb-2 text-lg font-medium">
          Vote Name
        </label>
        <input
          id="voteName"
          type="text"
          value={voteName}
          onChange={(e) => setVoteName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <h2 className="mb-2 text-lg font-semibold">Selected Movies</h2>
        <ul className="space-y-2">
          {selectedMovies.map((movie) => (
            <li
              key={movie.id}
              className="flex items-center justify-between p-3"
            >
              <div className="flex flex-row items-center">
                <img
                  src={`${imageBaseURL}${movie.poster_path}`}
                  alt={movie.title}
                  className="object-cover w-12 h-16 mr-4"
                />
                <span>{movie.title}</span>
              </div>
              <button
                onClick={() => removeMovie(movie.id)}
                className="font-medium text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Add Movies
      </button>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 ml-4 text-white bg-green-600 rounded-md hover:bg-green-700"
      >
        Create Vote
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-md shadow-lg w-96">
            <h2 className="mb-4 text-lg font-semibold">Search Movies</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie..."
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 mb-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Search
            </button>
            <ul className="space-y-2">
              {searchResults.map((movie) => (
                <li
                  key={movie.id}
                  className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
                >
                  <div className="flex items-center">
                    <img
                      src={`${imageBaseURL}${movie.poster_path}`}
                      alt={movie.title}
                      className="object-cover w-12 h-16 mr-4"
                    />
                    <span className="truncate">{movie.title}</span>
                  </div>
                  <button
                    onClick={() => addMovie(movie)}
                    className="font-medium text-green-600 hover:text-green-800"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateVote;
