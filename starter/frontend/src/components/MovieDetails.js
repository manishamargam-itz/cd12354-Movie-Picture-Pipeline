import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function MovieDetails({ movie }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (movie && movie.id) {
      axios.get(`${process.env.REACT_APP_MOVIE_API_URL}/movies/${movie.id}`).then((response) => {
        setDetails(response.data);
      });
    }
  }, [movie]);

  if (!movie) {
    return <div className="movie-detail-container">Select a movie to see details.</div>;
  }

  return (
    <div className="movie-detail-container">
      <h2>Movie Details</h2>
      <div className="movie-detail-card">
        {details?.movie?.image_url && (
          <img
            src={details.movie.image_url}
            alt={details.movie.title || movie.title}
            className="movie-detail-poster"
          />
        )}
        <h3>{details?.movie?.title || movie.title}</h3>
        <p>{details?.movie?.description || movie.description}</p>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
  }),
};

export default MovieDetails;