import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieDetails({ movie }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    setDetails(null);
    if (movie && movie.id) {
      const apiUrl = process.env.REACT_APP_MOVIE_API_URL || 'http://localhost:5000';
      axios.get(`${apiUrl}/movies/${movie.id}`).then((response) => {
        setDetails(response.data.movie);
      });
    }
  }, [movie]);

  if (!movie) {
    return <p>Hover over a movie to see details</p>;
  }

  const title = details?.title || movie.title;
  const description = details?.description || movie.description;

  return (
    <div className="movie-details">
      <h2 className="movie-title">{title}</h2>
      {description && <p className="movie-description">{description}</p>}
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default MovieDetails;
