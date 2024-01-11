import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Details } from '../pages/Details'
import { AddPost } from '../pages/AddPost'
import Protected from './Protected'

export const AllRoutes = () => {
  return (
    <Routes>
        <Route element={<Dashboard />} path='/' ></Route>
        <Route element={<Details />} path='/post/:slug' ></Route>
        <Route element={<Protected>
              <AddPost />
            </Protected>} path='/post/add' ></Route>
    </Routes>
  )
}
