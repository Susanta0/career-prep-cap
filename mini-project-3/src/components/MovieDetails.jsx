import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedMovie } from "../features/moviesSlice";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { selectedMovie } = useSelector((state) => state.movies);

  if (!selectedMovie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
          onClick={() => dispatch(clearSelectedMovie())}
        >
          ❌
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 pr-8">
            {selectedMovie.Title} ({selectedMovie.Year})
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <img 
              src={selectedMovie.Poster !== "N/A" ? selectedMovie.Poster : "https://via.placeholder.com/300"} 
              alt={selectedMovie.Title} 
              className="w-full md:w-64 h-auto object-cover rounded-lg"
            />
            <div className="flex-1 space-y-4">
              <div>
                <span className="font-semibold text-gray-700">Genre: </span>
                <span className="text-gray-600">{selectedMovie.Genre}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Rating: </span>
                <span className="text-gray-600">{selectedMovie.imdbRating}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Plot: </span>
                <p className="text-gray-600 mt-2 leading-relaxed">{selectedMovie.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
