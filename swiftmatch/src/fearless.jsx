import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importando o cabeçalho, ajuste o caminho se necessário
import './fearless.css'; 

function Fearless() {
  const [musicTitles, setMusicTitles] = useState([
    "Fearless",
    "Fifteen",
    "Love Story",
    "Hey Stephen",
    "White Horse",
    "You Belong With Me",
    "Breathe",
    "Tell Me Why",
    "You're Not Sorry",
    "The Way I Loved You",
    "Forever & Always",
    "The Best Day",
    "Change",
    "Jump Then Fall",
    "Untouchable",
    "Come In With The Rain",
    "Superstar",
    "The Other Side Of The Door",
    "Today Was A Fairytale",
    "You All Over Me",
    "Mr. Perfecly Fine",
    "We Were Happy",
    "That's When",
    "Don't You",
    "Bye Bye Baby",
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#1c141c';
    // Tenta carregar o ranking salvo do localStorage
    const savedRanking = JSON.parse(localStorage.getItem('fearlessRanking'));  // Mudança aqui
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
    localStorage.setItem('fearlessRanking', JSON.stringify(musicTitles));  // Mudança aqui
    alert('Ranking salvo com sucesso!');
  };

  return (
    <div className="fearless">
      <Header />
      <main className="fearless-content">
        <div className="fearless-button-container">
          {musicTitles.map((title, index) => (
            <div
              key={index}
              className="fearless-music-button"
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

export default Fearless;
