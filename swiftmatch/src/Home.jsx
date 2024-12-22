import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Home() {

  useEffect(() => {
    // Altera o estilo de fundo do body quando a página 'Home' for renderizada
    document.body.style.backgroundColor = '#74343c'; 
    

    // Limpa o estilo quando a página for desmontada para não afetar outras páginas
    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, []);

  return (
    <div className="app-container">
        <h1>Swift Match</h1>
        <p>Rank your favorites and compare!</p>
        <Link to="/criar-conta">
          <button className="start-button">Start</button>
        </Link>
    </div>
  ); 
}

export default Home