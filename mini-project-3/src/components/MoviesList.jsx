import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails, fetchMovies } from "../features/moviesSlice";
import { addFavorite, removeFavorite } from "../features/favoritesSlice";

const MoviesList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error, searchTerm, currentPage } = useSelector(
    (state) => state.movies
  );
  const favorites = useSelector((state) => state.favorites);

  const isFav = (id) => favorites.some((f) => f.imdbID === id);

  const loadMore = () => {
    dispatch(fetchMovies({ searchTerm, page: currentPage + 1 }));
  };

  if (loading) return <p className="text-center py-8 text-blue-600 text-lg">Loading movies...</p>;
  if (error) return <p className="text-center py-8 text-red-600 text-lg">{error}</p>;
  if (movies.length === 0)
    return <p className="text-center py-8 text-gray-600 text-lg">No movies found.</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 relative group"
            onClick={() => dispatch(fetchMovieDetails(movie.imdbID))}
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150"
              }
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{movie.Title}</h3>
              <p className="text-gray-600 text-sm mb-3">{movie.Year}</p>
              <button
                className={`absolute top-2 right-2 text-2xl transition-all duration-200 hover:scale-110 ${
                  isFav(movie.imdbID) ? 'text-red-500' : 'text-white'
                } drop-shadow-lg`}
                onClick={(e) => {
                  e.stopPropagation();
                  isFav(movie.imdbID)
                    ? dispatch(removeFavorite(movie.imdbID))
                    : dispatch(addFavorite(movie));
                }}
              >
                {isFav(movie.imdbID) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          onClick={loadMore}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default MoviesList;