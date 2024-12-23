import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importando o cabeçalho, ajuste o caminho se necessário
import './red.css'; 

function Red() {
  const [musicTitles, setMusicTitles] = useState([
    "State Of Grace",
    "Red",
    "Treacherous",
    "I Knew You Were Trouble",
    "All Too Well",
    "22",
    "I Almost Do",
    "We Are Never Ever Getting Back Together",
    "Stay Stay Stay",
    "The Last Time",
    "Holy Ground",
    "Sad Beutiful Tragic",
    "The Lucky One",
    "Everything Has Changed",
    "Starlight",
    "Begin Again",
    "The Moment I Knew",
    "Come Back... Be Here",
    "Girl At Home",
    "Ronan",
    "Better Man",
    "Nothing New",
    "Babe",
    "Message In A Bottle",
    "I Bet You Think About Me",
    "Forever Winter",
    "Run",
    "The Very First Night",
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#c4b4a4';
    // Tenta carregar o ranking salvo do localStorage
    const savedRanking = JSON.parse(localStorage.getItem('RedRanking'));  // Mudança aqui
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
    localStorage.setItem('RedRanking', JSON.stringify(musicTitles));  // Mudança aqui
    alert('Ranking salvo com sucesso!');
  };

  return (
    <div className="Red">
      <Header />
      <main className="Red-content">
        <div className="Red-button-container">
          {musicTitles.map((title, index) => (
            <div
              key={index}
              className="Red-music-button"
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

export default Red;
