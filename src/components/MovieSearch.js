import React, { useState, useEffect } from "react";

export default function MovieSearch() {
  const apiEndpoint = "https://www.omdbapi.com/?apikey=b2cff54a";
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const getMovies = async (query) => {
    try {
      const response = await fetch(
        `${apiEndpoint}&s=${encodeURIComponent(query)}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setError("");
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const displayMovies = async () => {
    if (searchQuery) {
      const payload = await getMovies(searchQuery);
      if (!payload || !payload.Search) {
        setMovies([]);
        setError("No movies found.");
        return;
      }
      const sortedMovies = payload.Search.sort((a, b) => {
        return sortBy === "year"
          ? b.Year - a.Year
          : a.Title.localeCompare(b.Title);
      });
      setMovies(sortedMovies);
    }
  };

  useEffect(() => {
    displayMovies();
  }, [searchQuery, sortBy]); // Re-run when searchQuery or sortBy changes

  return (
    <div>
      <input
        type="text"
        id="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for movies..."
      />
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="title">Sort by Title</option>
        <option value="year">Sort by Year</option>
      </select>
      {error && <p>{error}</p>}
      <div id="search-input">
        {movies.map((movie) => (
          <div className="container" key={movie.imdbID}>
            <p>Title: {movie.Title}</p>
            <p>Year: {movie.Year}</p>
            <p>ImdbID: {movie.imdbID}</p>
            <p>Type: {movie.Type}</p>
            <p>
              Poster: <img src={movie.Poster} alt={movie.Title} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* State Management: We use useState to manage searchQuery, sortBy, movies, and error.
Fetching Movies: The getMovies function fetches data from the API and handles errors.
Displaying Movies: The displayMovies function sorts and sets the movies based on the search query and selected sort option.
Effect Hook: The useEffect hook runs displayMovies whenever searchQuery or sortBy changes.
Rendering: We render an input for the search query, a dropdown for sorting, and a list of movie results. 
*/
