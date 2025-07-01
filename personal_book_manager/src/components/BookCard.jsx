import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({ id, title, author, genre, price, category }) => {
  return (
    <Link to={`/book/${id}`}>
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 hover:border-blue-300">
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{title}</h3>
      
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-semibold text-gray-700">Author:</span> {author}
        </p>
        
        <p className="text-gray-600">
          <span className="font-semibold text-gray-700">Genre:</span> {genre}
        </p>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <p className="text-lg font-bold text-green-600">${price}</p>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {category}
          </span>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default BookCard