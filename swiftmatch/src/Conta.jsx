import React, { useState, useEffect } from 'react';
import Header from './Header'; // Importando o cabeçalho
import './Conta.css';
import { Link } from 'react-router-dom'; // Importe o Link

function Conta() {
  const [hoveredButton, setHoveredButton] = useState(null);

  useEffect(() => {
    // Altera o fundo do body quando a página 'Conta' for renderizada
    document.body.style.backgroundColor = '#f5f8fa';  // Cor de fundo desejada

    // Limpa o estilo quando a página for desmontada
    return () => {
      document.body.style.backgroundColor = ''; // Restaura o fundo original
    };
  }, []);

  const handleMouseEnter = (buttonId) => {
    setHoveredButton(buttonId);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const buttons = [
    { id: 1, defaultImg: '/images/albums.png', hoverImg: '/images/albums2.jpg' },
    { id: 2, defaultImg: '/images/TaylorSwift.png', hoverImg: '/images/taylorswift2.jpg' },
    { id: 3, defaultImg: '/images/fearless.png', hoverImg: '/images/fearless2.jpg' },
    { id: 4, defaultImg: '/images/speaknow.png', hoverImg: '/images/speaknow.jpg' },
    { id: 5, defaultImg: '/images/red.png', hoverImg: '/images/red.jpg' },
    { id: 6, defaultImg: '/images/1989.png', hoverImg: '/images/1989.jpg' },
    { id: 7, defaultImg: '/images/reputation.png', hoverImg: '/images/reputation.jpg' },
    { id: 8, defaultImg: '/images/lover.png', hoverImg: '/images/lover.jpg' },
    { id: 9, defaultImg: '/images/folklore.png', hoverImg: '/images/folklore.jpg' },
    { id: 10, defaultImg: '/images/evermore.png', hoverImg: '/images/evermore.jpg' },
    { id: 11, defaultImg: '/images/midnights.png', hoverImg: '/images/midnights.jpg' },
    { id: 12, defaultImg: '/images/ttpd.png', hoverImg: '/images/ttpd.jpg' },
  ];

  return (
    <div className="conta">
      <Header />
      <main className="conta-content">
        <h2>Bem-vindo à sua conta!</h2>
        <p>Aqui você pode gerenciar suas informações, preferências, e muito mais.</p>
        <div className="buttons-container">
          {buttons.map((button) => (
            <Link key={button.id} to={button.id === 1 ? "/albums" : "#"}> {/* Se o botão for o primeiro, redireciona para /albums */}
              <img
                src={hoveredButton === button.id ? button.hoverImg : button.defaultImg}
                alt={`Button ${button.id}`}
                className="button"
                onMouseEnter={() => handleMouseEnter(button.id)}
                onMouseLeave={handleMouseLeave}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Conta;
