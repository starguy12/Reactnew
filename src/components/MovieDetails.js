import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=b2cff54a&i=${id}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovie(data);
        setError("");
      } catch (err) {
        setError(err.message);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found.</div>;
  }

  return (
    <div className="movie-details">
      <div className="movie-details-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="movie-details-poster"
        />
        <div className="movie-details-info">
          <h1 className="movie-details-title">{movie.Title}</h1>
          <p className="movie-details-year">Year: {movie.Year}</p>
          <p className="movie-details-rated">Rated: {movie.Rated}</p>
          <p className="movie-details-runtime">Runtime: {movie.Runtime}</p>
          <p className="movie-details-genre">Genre: {movie.Genre}</p>
          <p className="movie-details-director">Director: {movie.Director}</p>
          <p className="movie-details-actors">Actors: {movie.Actors}</p>
          <p className="movie-details-plot">Plot: {movie.Plot}</p>
          <p className="movie-details-imdb">IMDB Rating: {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}
