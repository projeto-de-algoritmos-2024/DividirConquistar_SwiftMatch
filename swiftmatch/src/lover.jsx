import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importando o cabeçalho, ajuste o caminho se necessário
import './lover.css'; 

function Lover() {
  const [musicTitles, setMusicTitles] = useState([
    "I Forgot That You Existed",
    "Cruel Summer",
    "Lover",
    "The Man",
    "The Archer",
    "I Think He Knows",
    "Miss Americana & The Heartbreak Prince",
    "Paper Rings",
    "Cornelia Street",
    "Death By A Thousand Cuts",
    "London Boy",
    "Soon You'll Get Better",
    "False God",
    "You Need To Calm Down",
    "Afterglow",
    "ME!",
    "It's Nice To Have A Friend",
    "Daylight",
    "All Of The Girls",
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#3c2c34';
    // Tenta carregar o ranking salvo do localStorage
    const savedRanking = JSON.parse(localStorage.getItem('LoverRanking'));  // Mudança aqui
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
    localStorage.setItem('LoverRanking', JSON.stringify(musicTitles));  // Mudança aqui
    alert('Ranking salvo com sucesso!');
  };

  return (
    <div className="Lover">
      <Header />
      <main className="Lover-content">
        <div className="Lover-button-container">
          {musicTitles.map((title, index) => (
            <div
              key={index}
              className="Lover-music-button"
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

export default Lover;
