import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import RegisterLink from './components/RegisterLink';
import DashBoard from './components/DashBoard';
import RegisterTeam from './components/RegisterTeam';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerTeam" element={<RegisterTeam />} />
          <Route path="/registerLink" element={<RegisterLink />} />
          <Route path="/dashBoard" element={<DashBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
