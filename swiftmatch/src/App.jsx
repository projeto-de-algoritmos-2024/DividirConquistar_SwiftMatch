import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; 
import CreateAccount from './CreateAccount'; 
import './App.css'; 
import Login from './Login';
import Conta from './Conta';
import Albums from './Albums';
import Pareamento from './pareamento';
import Compare from './comparar';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/criar-conta" element={<CreateAccount />} /> 
        <Route path="/conta" element={<Conta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/pareamento" element={<Pareamento />} />
        <Route path="/comparar" element={<Compare />} />
      </Routes>
    </Router>
  );
}

export default App;
