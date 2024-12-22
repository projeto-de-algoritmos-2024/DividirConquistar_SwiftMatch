import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; // Importando a Tela Inicial
import CreateAccount from './CreateAccount'; // Importando a Tela de Criação de Conta
import './App.css'; // Manter o CSS global ou para ambos
import Login from './Login';
import Conta from './Conta';
import Albums from './Albums';
import Pareamento from './pareamento';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página inicial */}
        <Route path="/criar-conta" element={<CreateAccount />} /> {/* Página de criação de conta */}
        <Route path="/conta" element={<Conta />} />
        <Route path="/login" element={<Login />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/pareamento" element={<Pareamento />} />
      </Routes>
    </Router>
  );
}

export default App;
