import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import BookPage from '../components/BookPage'
import BookDetails from '../components/BookDetails'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/add-book' element={<BookPage/>} />
        <Route path='/book/:id' element={<BookDetails/>} />
    </Routes>
  )
}

export default AllRoutes