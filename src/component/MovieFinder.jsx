import React, { useState } from "react";

const MovieFinder = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const searchMovies = async (searchTerm) => {
    const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=4a3b711b`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Search) {
        const moviesWithPosters = await Promise.all(
          data.Search.map(async (movie) => {
            const moviessUrl = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=4a3b711b`;
            const moviesResponse = await fetch(moviessUrl);
            const moviesData = await moviesResponse.json();
            return {
              ...movie,
              Poster: moviesData.Poster,
            };
          })
        );
        console.log(moviesWithPosters);
        setMovies(moviesWithPosters);
        setErrorMessage("");
      } else {
        setMovies([]);
        setErrorMessage("No movies found.");
      }
    } catch (error) {
      console.error("Error :", error);
      setMovies([]);
      setErrorMessage("Error fetching. Please try again.");
    }
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      searchMovies(searchTerm);
    }, 3000);

    setDebounceTimeout(timeout);
  };

  return (
    <div className="App">
      <h1>Movie Finder</h1>

      <form>
        <input
          type="text"
          placeholder="Search for a movie"
          value={search}
          onChange={handleSearchChange}
        />

        <button type="submit" disabled>
          Search
        </button>
      </form>

      <div>
        {errorMessage && <p>{errorMessage}</p>}
        {movies.length > 0 && (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <img
                  src={
                    movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"
                  }
                  alt={movie.Title}
                />
                <div>
                  <h2>{movie.Title}</h2>
                  <p>{movie.Year}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieFinder;
