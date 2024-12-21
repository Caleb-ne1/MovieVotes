import React, { useState, useEffect } from "react";
import supabase from "../supabase/client";
import {Link} from 'react-router-dom'
const VotingPage = () => {
  const [movies, setMovies] = useState([]);
  const [userVote, setUserVote] = useState(null);
  const [votedMovies, setVotedMovies] = useState([]);
  const [topVotedMovie, setTopVotedMovie] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setUserToken(JSON.parse(token));
    }
    fetchMovies();
  }, []);

  // to fetch movies
  const fetchMovies = async () => {
    try {
      const { data: votes, error } = await supabase
        .from("user_votes")
        .select("*");
      if (error) throw error;

      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      setUser(userId);

      const { data: userVotes, error: userVotesError } = await supabase
        .from("user_votes")
        .select("*")
        .eq("user_id", userId);

      if (userVotesError) throw userVotesError;

      const votedMoviesIds = userVotes.map((vote) => vote.vote_id);
      setVotedMovies(votedMoviesIds);

      const { data: moviesData, error: moviesError } = await supabase
        .from("vote_movies")
        .select("*");
      if (moviesError) throw moviesError;

      const moviesWithVotes = moviesData.map((movie) => ({
        ...movie,
        voteCount: 0,
      }));

      votes.forEach((vote) => {
        const movieIndex = moviesWithVotes.findIndex(
          (movie) => movie.id === vote.vote_id
        );
        if (movieIndex !== -1) {
          moviesWithVotes[movieIndex].voteCount += 1;
        }
      });

      moviesWithVotes.sort((a, b) => b.voteCount - a.voteCount);
      setMovies(moviesWithVotes);
      setTopVotedMovie(moviesWithVotes[0]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleVote = async (movieId) => {
    if (!user) {
      alert("You need to log in to vote.");
      return;
    }

    try {
      if (votedMovies.length > 0) {
        // if  user has already voted, deletes their old vote
        const { error: deleteError } = await supabase
          .from("user_votes")
          .delete()
          .eq("user_id", user)
          .eq("vote_id", votedMovies[0]); 

        if (deleteError) throw deleteError;

        // update the votedMovies state by removing the old vote
        setVotedMovies([]);
      }

      // insert new vote
      const { error: voteError } = await supabase
        .from("user_votes")
        .insert([{ user_id: user, vote_id: movieId }]);

      if (voteError) throw voteError;

      // add the new movie to the votedMovies state
      setVotedMovies([movieId]);

      // re-fetch movies to update the vote count
      fetchMovies();
    } catch (error) {
      console.error("Error submitting vote:", error.message);
      alert("Failed to submit vote.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-white pt-4">
          Vote for Your Favorite Movie
        </h1>

        {topVotedMovie && (
          <div className="p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Top Voted Movie
            </h2>
            <div className="flex flex-col  items-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${topVotedMovie.movie_poster}`}
                alt={topVotedMovie.movie_title}
                className="w-56 h-56 rounded-lg shadow-md mr-6 "
              />
              <div>
                <h3 className="text-xl text-center font-bold text-white mt-2">
                  {topVotedMovie.movie_title}
                </h3>
                <p className="text-white mt-2 bg-green-400 p-4 rounded-full text-center color-">
                  Votes:{" "}
                  <span className="font-semibold">
                    {topVotedMovie.voteCount}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="p-4 bg-white flex flex-col justify-between"
          >
            <div className="flex flex-col items-center">
              <Link to={`/movie/${movie.movie_id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.movie_poster}`}
                alt={movie.movie_title}
                className="w-56 h-30 rounded-lg shadow-sm mr-4"
              />
              </Link>
              <h3 className="text-lg font-semibold text-gray-700">
                {movie.movie_title}
              </h3>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                Votes: <span className="font-semibold">{movie.voteCount}</span>
              </p>
              <button
                onClick={() => handleVote(movie.id)}
                className={`mt-2 w-full py-2 text-white font-medium rounded-md ${
                  votedMovies.includes(movie.id)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={votedMovies.includes(movie.id)}
              >
                {votedMovies.includes(movie.id) ? "Voted" : "Vote"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingPage;
