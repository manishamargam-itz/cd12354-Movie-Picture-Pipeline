import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getMovieApiUrl } from '../api';

function MovieList({ onMovieHover, onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`${getMovieApiUrl()}/movies`)
      .then((response) => {
        setMovies(response.data.movies || []);
      })
      .catch(() => {
        setMovies([]);
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
          onMouseOver={() => handleSelect(movie)}
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
