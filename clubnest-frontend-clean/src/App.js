import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Clubs from './pages/Clubs';
import Recruitments from './pages/Recruitments';
import Apply from './pages/Apply';
import Applications from './pages/Applications';
import './App.css';

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">🏛️</span>
        <span className="brand-name">ClubNest</span>
        <span className="brand-tag">Find Your Community</span>
      </div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Clubs</Link>
        <Link to="/recruitments" className={location.pathname === '/recruitments' ? 'active' : ''}>Recruitments</Link>
        <Link to="/apply" className={location.pathname === '/apply' ? 'active' : ''}>Apply</Link>
        <Link to="/applications" className={location.pathname === '/applications' ? 'active' : ''}>Applications</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Clubs />} />
            <Route path="/recruitments" element={<Recruitments />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>ClubNest © 2025 — Find Your Community. Join Your Club.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
