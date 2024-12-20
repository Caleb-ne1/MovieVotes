import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const Detail = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_APP_TMDB_API_KEY;
  const imageBaseURL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        setMovie(response.data);
        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const trailerData = trailerResponse.data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailerData) {
          setTrailer(trailerData.key);
        }
      } catch (error) {
        setError("Error fetching movie details. Please try again later.");
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id, API_KEY]);

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  if (!movie) return <div className="text-center mt-4"><Loader /></div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="p-6">
        <Link to="/" className="text-blue-600 underline mb-4 inline-block">
          Back to Home
        </Link>
        <div className="overflow-hidden mt-6 flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <img
              src={`${imageBaseURL}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:ml-8 flex-1">
            <h2 className="text-3xl font-semibold mt-4 text-gray-900">
              {movie.title}
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Overview:</strong> {movie.overview}
            </p>
          </div>
        </div>
        {trailer && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-700">
              Watch Trailer
            </h3>
            <div className="mt-2">
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Detail;
