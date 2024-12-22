import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'; // Cabeçalho importado
import './Albums.css';
import { useNavigate } from 'react-router-dom'; // Para navegação, se necessário

const albums = [
  { id: 1, name: 'TaylorSwift', image: '/images/big_taylorswift.jpg', pageColor: '#0c1c0c', headerColor: '#acccac', headerTextColor: '#0c1c0c' },
  { id: 2, name: 'Fearless', image: '/images/big_fearless.jpg', pageColor: '#1c141c', headerColor: '#fcdca4', headerTextColor: '#1c141c' },
  { id: 3, name: 'SpeakNow', image: '/images/big_speaknow.jpg', pageColor: '#040404', headerColor: '#d4bcdc', headerTextColor: '#040404' },
  { id: 4, name: 'Red', image: '/images/big_red.jpg', pageColor: '#c4b4a4', headerColor: '#74343c', headerTextColor: '#c4b4a4' },
  { id: 5, name: '1989', image: '/images/big_1989.jpg', pageColor: '#d4f4fc', headerColor: '#044c64', headerTextColor: '#d4f4fc' },
  { id: 6, name: 'Reputation', image: '/images/big_reputation.jpg', pageColor: '#cccccc', headerColor: '#2c2424', headerTextColor: '#cccccc' },
  { id: 7, name: 'Lover', image: '/images/big_lover.jpg', pageColor: '#3c2c34', headerColor: '#fcb4d4', headerTextColor: '#3c2c34' },
  { id: 8, name: 'Folklore', image: '/images/big_folklore.jpg', pageColor: '#040404', headerColor: '#d4d4d4', headerTextColor: '#3c2c34' },
  { id: 9, name: 'Evermore', image: '/images/big_evermore.jpg', pageColor: '#2c2424', headerColor: '#e4ccac', headerTextColor: '#2c2424' },
  { id: 10, name: 'Midnights', image: '/images/big_midnights.jpg', pageColor: '#1c2c44', headerColor: '#e4ecfc', headerTextColor: '#1c2c44' },
  { id: 11, name: 'TTPD', image: '/images/big_ttpd.jpg', pageColor: '#ececec', headerColor: '#9c948c', headerTextColor: '#ececec' },
];

function Albums() {
  const [ranking, setRanking] = useState(albums);
  const [draggedAlbum, setDraggedAlbum] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [pageColor, setPageColor] = useState('#FFFFFF');
  const [headerColor, setHeaderColor] = useState('#000000');
  const [headerTextColor, setHeaderTextColor] = useState('#FFFFFF'); 
  const [buttonColor, setButtonColor] = useState('#000000'); // Estado para a cor do botão
  const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF'); // Cor do texto do botão
  const navigate = useNavigate();

  const imagesRef = useRef(null);

  useEffect(() => {
    if (selectedAlbum) {
      const album = albums.find(album => album.id === selectedAlbum);
      document.body.style.backgroundColor = album.pageColor;
      document.body.style.transition = 'background-color 0.3s ease';
      
      // Atualiza as cores do botão de acordo com as cores do álbum selecionado
      setButtonColor(album.headerColor);
      setButtonTextColor(album.headerTextColor);
    } else {
      document.body.style.backgroundColor = '#FFFFFF';
      setButtonColor('#000000');
      setButtonTextColor('#FFFFFF');
    }

    return () => {
      document.body.style.backgroundColor = ''; // Limpa a cor de fundo ao desmontar
    };
  }, [selectedAlbum]);

  const handleImageClick = (id, pageColor, headerColor, headerTextColor) => {
    setSelectedAlbum(id);
    setPageColor(pageColor);
    setHeaderColor(headerColor);
    setHeaderTextColor(headerTextColor);
  };

  const handleDragStart = (album) => {
    setDraggedAlbum(album);
  };

  const handleDrop = (e, album) => {
    e.preventDefault();
    const updatedRanking = [...ranking];
    const draggedIndex = updatedRanking.indexOf(draggedAlbum);
    const droppedIndex = updatedRanking.indexOf(album);

    updatedRanking.splice(draggedIndex, 1);
    updatedRanking.splice(droppedIndex, 0, draggedAlbum);

    setRanking(updatedRanking);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSaveRanking = () => {
    const userId = localStorage.getItem('userId'); // Recupera o userId salvo no login
    const rankingIds = ranking.map((album) => album.id);
  
    fetch('http://localhost:5000/api/save-ranking', {
      method: 'POST',
      body: JSON.stringify({ userId, ranking: rankingIds }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Ranking salvo:', data);
        navigate('/pareamento'); // Redireciona para a página de pareamento ao salvar com sucesso
      })
      .catch((error) => {
        console.error('Erro ao salvar o ranking:', error);
      });
  };  

  const scrollToImages = () => {
    if (imagesRef.current) {
      imagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="albums">
      <Header style={{ backgroundColor: headerColor, color: headerTextColor }} />
      <main className="albums-content">
        <div className="albums-rankings">
          {ranking.map((album) => (
            <div
              key={album.id}
              className={`album ${selectedAlbum === album.id ? 'selected' : ''}`}
              onClick={() => handleImageClick(album.id, album.pageColor, album.headerColor, album.headerTextColor)}
              draggable
              onDragStart={() => handleDragStart(album)}
              onDrop={(e) => handleDrop(e, album)}
              onDragOver={handleDragOver}
            >
              <img
                src={album.image}
                alt={album.name}
                className="album-image"
              />
            </div>
          ))}
        </div>
        <button 
          onClick={handleSaveRanking}
          style={{ backgroundColor: buttonColor, color: buttonTextColor }} // Aplica as cores ao botão
        >
          Salvar Ranking
        </button>
      </main>
    </div>
  );
}

export default Albums;
