import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './Pages/landing.js';
import MovieDetails from './Pages/movieDetails.js';
import LoadingScreen from './Components/loading.js';
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movies" element={<LandingPage />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
