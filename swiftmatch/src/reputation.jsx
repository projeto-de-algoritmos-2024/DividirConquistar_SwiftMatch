import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importando o cabeçalho, ajuste o caminho se necessário
import './reputation.css'; 

function Reputation() {
  const [musicTitles, setMusicTitles] = useState([
    "...Ready For It?",
    "End Game",
    "I Did Something Bad",
    "Don't Blame Me",
    "Delicate",
    "Look What You Made Me Do",
    "So It Goes",
    "Gorgeous",
    "Getaway Car",
    "King Of My Heart",
    "Dancing With Our Hands Tied",
    "Dress",
    "This Is Why We Can't Have Nice Things",
    "Call It What You Want",
    "New Year's Day",
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#cccccc';
    // Tenta carregar o ranking salvo do localStorage
    const savedRanking = JSON.parse(localStorage.getItem('ReputationRanking'));  // Mudança aqui
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
    localStorage.setItem('ReputationRanking', JSON.stringify(musicTitles));  // Mudança aqui
    alert('Ranking salvo com sucesso!');
  };

  return (
    <div className="Reputation">
      <Header />
      <main className="Reputation-content">
        <div className="Reputation-button-container">
          {musicTitles.map((title, index) => (
            <div
              key={index}
              className="Reputation-music-button"
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

export default Reputation;
