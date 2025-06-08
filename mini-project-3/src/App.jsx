import React from 'react';
import SearchBar from './components/SearchBar';
import Favorites from './components/Favorites';
import MoviesList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';

const App = () => {
  return (
    <div className="App">
      <h1>🎬 Movie Search App</h1>
      <SearchBar />
      <Favorites />
      <MoviesList />
      <MovieDetails />
    </div>
  );
};

export default App;
