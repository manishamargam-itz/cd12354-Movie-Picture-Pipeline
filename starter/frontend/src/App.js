import React, { useState } from 'react';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="container">
      <h1>Movie List</h1>
      <MovieList onMovieHover={setSelectedMovie} />
      
      <h1>Movie Details</h1>
      {selectedMovie ? <MovieDetails movie={selectedMovie} /> : <p>Hover over a movie to see details</p>}
    </div>
  );
}

export default App;