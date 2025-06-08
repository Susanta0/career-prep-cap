import React from 'react';
import { useSelector } from 'react-redux';

const Favorites = () => {
  const favorites = useSelector(state => state.favorites);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">❤️ Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No favorites added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map(movie => (
            <div key={movie.imdbID} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} 
                alt={movie.Title} 
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{movie.Title}</h3>
                <p className="text-gray-600 text-sm">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;