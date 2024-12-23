import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importando o cabeçalho, ajuste o caminho se necessário
import './midnights.css'; 

function Midnights() {
  const [musicTitles, setMusicTitles] = useState([
    "Lavender Haze",
    "Maroon",
    "Anti-Hero",
    "Snow On The Beach",
    "You're On Your Own, Kid",
    "Midnight Rain",
    "Question...?",
    "Vigilante Shit",
    "Bejeweled",
    "Labyrinth",
    "Karma",
    "Sweet Nothing",
    "Mastermind",
    "The Great War",
    "Bigger Than The Whole Sky",
    "Paris",
    "High Infidelity",
    "Glitch",
    "Would've, Could've, Should've",
    "Dear Reader",
    "Hits Different",
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#1c2c44';
    // Tenta carregar o ranking salvo do localStorage
    const savedRanking = JSON.parse(localStorage.getItem('MidnightsRanking'));  // Mudança aqui
    if (savedRanking) {
      setMusicTitles(savedRanking);
    }
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // Função chamada ao iniciar o arrasto
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Função chamada ao soltar o elemento
  const handleDrop = (index) => {
    if (draggedIndex === null) return;

    const updatedTitles = [...musicTitles];
    const [movedItem] = updatedTitles.splice(draggedIndex, 1);
    updatedTitles.splice(index, 0, movedItem);

    setMusicTitles(updatedTitles);
    setDraggedIndex(null);
  };

  // Função para evitar comportamento padrão no "drag over"
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Função para salvar o ranking no localStorage
  const saveRanking = () => {
    localStorage.setItem('MidnightsRanking', JSON.stringify(musicTitles));  // Mudança aqui
    alert('Ranking salvo com sucesso!');
  };

  return (
    <div className="Midnights">
      <Header />
      <main className="Midnights-content">
        <div className="Midnights-button-container">
          {musicTitles.map((title, index) => (
            <div
              key={index}
              className="Midnights-music-button"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              {title}
            </div>
          ))}
        </div>
        <button className="save-button" onClick={saveRanking}>
          Salvar Ranking
        </button>
      </main>
    </div>
  );
}

export default Midnights;
