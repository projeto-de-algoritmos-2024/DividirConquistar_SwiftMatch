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
import Taylorswift from './taylorswift';
import Fearless from './fearless';
import Speaknow from './speaknow';
import Red from './red';
import Ts1989 from './1989';
import Reputation from './reputation';
import Lover from './lover';
import Folklore from './folklore';
import Evermore from './evermore';
import Midnights from './midnights';
import Ttpd from './ttpd';


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
        <Route path="/taylorswift" element={<Taylorswift />} />
        <Route path="/fearless" element={<Fearless />} />
        <Route path="/speaknow" element={<Speaknow />} />
        <Route path="/red" element={<Red />} />
        <Route path="/1989" element={<Ts1989 />} />
        <Route path="/reputation" element={<Reputation />} />
        <Route path="/lover" element={<Lover />} />
        <Route path="/folklore" element={<Folklore />} />
        <Route path="/evermore" element={<Evermore />} />
        <Route path="/midnights" element={<Midnights />} />
        <Route path="/ttpd" element={<Ttpd />} />
      </Routes>
    </Router>
  );
}

export default App;
