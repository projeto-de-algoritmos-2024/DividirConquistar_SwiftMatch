import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importando o cabeçalho, ajuste o caminho se necessário
import './ttpd.css'; 

function Ttpd() {
  const [musicTitles, setMusicTitles] = useState([
    "Fortnight",
    "The Tortured Poets Department",
    "My Boy Only Breaks His Favorite Toys",
    "Down Bad",
    "So Long, London",
    "But Dady I love Him",
    "Fresh Out The Slammer",
    "Florida!!!",
    "Guilty as Sin",
    "Who's Afraid of Little Old Me?",
    "I Can Fix Him (No Really I Can)",
    "loml",
    "I Can Do It With a Broken Heart",
    "The Smallest Man Who Ever Lived",
    "The ALchemy",
    "Clara Bow",
    "The Black Dog",
    "imgonnagetyouback",
    "The Albatross",
    "Chloe or Sam or Sophia or Marcus",
    "How Did It End?",
    "So High School",
    "I Hate It Here",
    "thanK you aIMee",
    "I Look in People's Windows",
    "The Prophecy",
    "Cassandra",
    "Peter",
    "The Bolter",
    "Robin",
    "The Manuscript",
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#ececec';
    // Tenta carregar o ranking salvo do localStorage
    const savedRanking = JSON.parse(localStorage.getItem('TtpdRanking'));  // Mudança aqui
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
    localStorage.setItem('TtpdRanking', JSON.stringify(musicTitles));  // Mudança aqui
    alert('Ranking salvo com sucesso!');
  };

  return (
    <div className="Ttpd">
      <Header />
      <main className="Ttpd-content">
        <div className="Ttpd-button-container">
          {musicTitles.map((title, index) => (
            <div
              key={index}
              className="Ttpd-music-button"
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

export default Ttpd;
