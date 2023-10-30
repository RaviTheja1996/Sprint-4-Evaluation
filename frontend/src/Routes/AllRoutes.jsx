import React from 'react'
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Posts from '../pages/Posts';
import Signup from '../pages/Signup';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  )
}

export default AllRoutes