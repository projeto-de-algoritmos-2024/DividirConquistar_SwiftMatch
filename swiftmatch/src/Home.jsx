import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Swift Match</h1>
        <p>Rank your favorites and compare!</p>
        <Link to="/criar-conta">
          <button className="start-button">Start</button>
        </Link>
      </header>
    </div>
  ); 
}

export default Home
