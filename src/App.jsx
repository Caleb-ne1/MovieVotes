import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar'
import Detail from './pages/Detail';
import AllMovies from './pages/AllMovies'
import CreateVote from './pages/CreateVote'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn'
import VerifyEmail from './pages/VerifyEmail';
function App() {
  const location = useLocation();
  const noNavbar = ["/", "/create/account", "/confirm-email"];
  return (
    <div className="bg-red">
      {!noNavbar.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/create/account" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/movies/create-vote" element={<CreateVote />} />
        <Route path='/confirm-email'  element={<VerifyEmail />}/>
      </Routes>
    </div>
  );
}

export default App
