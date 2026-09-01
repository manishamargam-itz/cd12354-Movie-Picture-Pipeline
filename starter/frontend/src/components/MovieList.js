import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieHover, onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_MOVIE_API_URL || 'http://localhost:5000';
    axios.get(`${apiUrl}/movies`).then((response) => {
      setMovies(response.data.movies);
    });
  }, []);

  const handleSelect = (movie) => {
    if (onMovieHover) {
      onMovieHover(movie);
    }
    if (onMovieClick) {
      onMovieClick(movie);
    }
  };

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <li
          className="movieItem"
          key={movie.id}
          onMouseEnter={() => handleSelect(movie)}
          onClick={() => handleSelect(movie)}
        >
          {movie.title}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieHover: PropTypes.func,
  onMovieClick: PropTypes.func,
};

export default MovieList;
