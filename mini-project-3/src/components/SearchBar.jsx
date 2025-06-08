import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "../hook/useDebounce";
import { fetchMovies, setSearchTerm } from "../features/moviesSlice";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const debounced = useDebounce(input, 700);

  useEffect(() => {
    if (debounced) {
      dispatch(setSearchTerm(debounced));
      dispatch(fetchMovies({ searchTerm: debounced, page: 1 }));
    }
  }, [debounced, dispatch]);

  return (
    <div className="p-6 bg-gray-50 border-b">
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
      </div>
    </div>
  );
};

export default SearchBar;
