import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

const BookPage = () => {
  // Load books from localStorage on mount
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem("books");
    return stored ? JSON.parse(stored) : [];
  });

    // Save books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const navigate=useNavigate()

  return (
    <div className="App font-sans bg-gray-100 min-h-screen">
      <center>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add new book</h1>

        <Formik
          initialValues={{
            title: "",
            author: "",
            genre: "",
            price: "",
            category: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const newBook = { ...values, id: Date.now() }; // Add unique id
            setBooks((prevBooks) => [...prevBooks, newBook]);
            setSubmitting(false);
            resetForm();
            alert("Book added successfully!");
            navigate("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white p-8 rounded-lg shadow-md inline-block min-w-[320px]">
              <Field
                type="text"
                name="title"
                placeholder="Enter book title"
                className="block w-11/12 mx-auto my-2 p-2 rounded border border-gray-300"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-xs"
              />

              <Field
                type="text"
                name="author"
                placeholder="Enter author name"
                className="block w-11/12 mx-auto my-2 p-2 rounded border border-gray-300"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="text-red-500 text-xs"
              />

              <Field
                type="text"
                name="genre"
                placeholder="Enter book genre"
                className="block w-11/12 mx-auto my-2 p-2 rounded border border-gray-300"
              />
              <ErrorMessage
                name="genre"
                component="div"
                className="text-red-500 text-xs"
              />

              <Field
                type="text"
                name="price"
                placeholder="Enter book price"
                className="block w-11/12 mx-auto my-2 p-2 rounded border border-gray-300"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-xs"
              />

              <Field
                type="text"
                name="category"
                placeholder="Enter book category"
                className="block w-11/12 mx-auto my-2 p-2 rounded border border-gray-300"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-xs"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-6 py-2 bg-gray-800 text-white rounded font-bold hover:bg-gray-700 transition"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </center>
    </div>
  );
};

export default BookPage;
