import React, { useEffect, useState } from 'react';
import Header from './Header'; // Importando o cabeçalho, ajuste o caminho se necessário
import './folklore.css'; 

function Folklore() {
  const [musicTitles, setMusicTitles] = useState([
    "the 1",
    "cardigan",
    "the last great american dynasty",
    "exile",
    "my tears ricochet",
    "mirrorball",
    "seven",
    "august",
    "this is me trying",
    "illicit affairs",
    "invisible string",
    "mad woman",
    "epiphany",
    "betty",
    "peace",
    "hoax",
    "the lakes",
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#040404';
    // Tenta carregar o ranking salvo do localStorage
    const savedRanking = JSON.parse(localStorage.getItem('FolkloreRanking'));  // Mudança aqui
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
    localStorage.setItem('FolkloreRanking', JSON.stringify(musicTitles));  // Mudança aqui
    alert('Ranking salvo com sucesso!');
  };

  return (
    <div className="Folklore">
      <Header />
      <main className="Folklore-content">
        <div className="Folklore-button-container">
          {musicTitles.map((title, index) => (
            <div
              key={index}
              className="Folklore-music-button"
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

export default Folklore;
