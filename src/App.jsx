import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Detail from './pages/Detail';
import AllMovies from './pages/AllMovies'
import CreateVote from './pages/CreateVote'
function App() {

  return (
    <div className="bg-red">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/movies/create-vote" element={<CreateVote />} />
      </Routes>
    </div>
  );
}

export default App
