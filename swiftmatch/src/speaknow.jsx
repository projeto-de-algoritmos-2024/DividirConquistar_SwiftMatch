import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importando o cabeçalho, ajuste o caminho se necessário
import './speaknow.css'; 

function Speaknow() {
  const [musicTitles, setMusicTitles] = useState([
    "Mine",
    "Sparks Fly",
    "Back To December",
    "Speak Now",
    "Dear John",
    "Mean",
    "The Story of Us",
    "Never Grow Up",
    "Enchanted",
    "Better Than Revenge",
    "Innocent",
    "Haunted",
    "Last Kiss",
    "Long Live",
    "Ours",
    "Superman",
    "Electric Touch",
    "When Emma Falls in Love",
    "I Can See You",
    "Castles Crumbling",
    "Foolish One",
    "Timeless",
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#1c141c';
    // Tenta carregar o ranking salvo do localStorage
    const savedRanking = JSON.parse(localStorage.getItem('SpeaknowRanking'));  // Mudança aqui
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
    localStorage.setItem('SpeaknowRanking', JSON.stringify(musicTitles));  // Mudança aqui
    alert('Ranking salvo com sucesso!');
  };

  return (
    <div className="Speaknow">
      <Header />
      <main className="Speaknow-content">
        <div className="Speaknow-button-container">
          {musicTitles.map((title, index) => (
            <div
              key={index}
              className="Speaknow-music-button"
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

export default Speaknow;
