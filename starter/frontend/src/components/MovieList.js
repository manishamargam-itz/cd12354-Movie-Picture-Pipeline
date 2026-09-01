import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieList({ onMovieHover }) {
  const [movies, setMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_MOVIE_API_URL}/movies`).then((response) => {
      setMovies(response.data.movies);
    });
  }, []);

  return (
    <ul>
      {movies.map((movie) => (
        <li 
          className="movieItem" 
          key={movie.id} 
          onMouseEnter={() => {
            setHoveredMovieId(movie.id);
            onMovieHover(movie);
          }}
          onMouseLeave={() => {
            setHoveredMovieId(null);
          }}
          style={{ cursor: 'pointer', marginBottom: '10px' }}
        >
          <div>{movie.title}</div>
          {hoveredMovieId === movie.id && (
            <div style={{ fontSize: '0.85em', color: '#555', marginTop: '2px' }}>
              {movie.description}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  onMovieHover: PropTypes.func.isRequired,
};

export default MovieList;