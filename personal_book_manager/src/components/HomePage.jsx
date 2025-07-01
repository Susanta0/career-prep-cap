import React, { useState, useEffect, useMemo } from "react";
import BookCard from "./BookCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [sortBooks, setSortBooks] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("books");
    setBooks(stored ? JSON.parse(stored) : []);
  }, []);

  const categoryList = useMemo(
    () => ["All", ...new Set(books.map((book) => book.category))],
    [books]
  );

  const sortValue = useMemo(() => {
    let filteredBooks =
      category === "All"
        ? [...books]
        : books.filter((book) => book.category === category);

    if (sortBooks === "asc") {
      filteredBooks.sort((a, b) => a.price - b.price);
    } else if (sortBooks === "desc") {
      filteredBooks.sort((a, b) => b.price - a.price);
    }

    return filteredBooks;
  }, [books, sortBooks, category]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-bold text-2xl sm:text-3xl text-gray-800 mb-8 text-center">
          Personal Book Manager App
        </h2>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 mb-2">
              Filter by Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              className="border border-gray-300 rounded-md p-2"
            >
              {categoryList.map((ele, ind) => (
                <option value={ele} key={ind}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="sort" className="block text-gray-700 mb-2">
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBooks}
              onChange={(e) => setSortBooks(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Select</option>
              <option value="asc">Price (Low to High)</option>
              <option value="desc">Price (High to Low)</option>
            </select>
          </div>
        </div>

        <div className="mb-8 text-right">
          <Link
            to="/add-book"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Book
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortValue.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
