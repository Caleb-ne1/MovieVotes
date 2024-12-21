import { useEffect, useState } from 'react'
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
import Profile from './pages/Profile';
import VotingPage from './pages/VotingPage';
function App() {
  const location = useLocation();
  const noNavbar = ["/", "/create/account", "/confirm-email"];

  const [token, setToken] = useState(false);
  if(token) {
    sessionStorage.setItem('token',JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])
  return (
    <div className="bg-red">
      {!noNavbar.includes(location.pathname) && <Navbar token={token} />}
      <Routes>
        <Route path="/" element={<SignIn setToken={setToken}/>} />
        <Route path="/create/account" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/movies/create-vote" element={<CreateVote />} /> 
        <Route path="/confirm-email" element={<VerifyEmail />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/movies/vote" element={<VotingPage  />}/> 
      </Routes>
    </div>
  );
}

export default App
