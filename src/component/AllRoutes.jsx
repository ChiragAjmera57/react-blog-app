import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Details } from '../pages/Details'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route element={<Dashboard />} path='/' ></Route>
        <Route element={<Details />} path='/post/:slug' ></Route>
    </Routes>
  )
}
