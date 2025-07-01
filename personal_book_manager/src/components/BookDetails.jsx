// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import TextSummarizer from "./TextSummarizer";

// const BookDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const books = JSON.parse(localStorage.getItem("books")) || [];
//   const book = books.find((book) => book.id === parseInt(id));

//   if (!book) {
//     return <div className="text-center text-red-500 mt-10">Book not found</div>;
//   }

//   return (
//     <div>
//       <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">{book.title}</h2>
//         <p className="mb-2 text-gray-700">
//           <strong>Author:</strong> {book.author}
//         </p>
//         <p className="mb-2 text-gray-700">
//           <strong>Genre:</strong> {book.genre}
//         </p>
//         <p className="mb-2 text-gray-700">
//           <strong>Price:</strong>{" "}
//           <span className="text-green-600">${book.price}</span>
//         </p>
//         <p className="mb-2 text-gray-700">
//           <strong>Category:</strong> {book.category}
//         </p>
//       </div>

//       <div>
//         <TextSummarizer/>
//       </div>

//       <div className="flex justify-center items-center mt-6">
//         <button
//           className="bg-blue-600 p-2 rounded-md"
//           onClick={() => navigate("/")}
//         >
//           Back To Home
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextSummarizer from "./TextSummarizer";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const books = JSON.parse(localStorage.getItem("books")) || [];
  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <div className="text-center text-red-500 mt-10">Book not found</div>;
  }

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{book.title}</h2>
        <p className="mb-2 text-gray-700">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Price:</strong>{" "}
          <span className="text-green-600">${book.price}</span>
        </p>
        <p className="mb-2 text-gray-700">
          <strong>Category:</strong> {book.category}
        </p>
      </div>

      <TextSummarizer title={book.title} author={book.author} />

      <div className="flex justify-center items-center mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
