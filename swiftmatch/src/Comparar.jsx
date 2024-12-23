import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import './Comparar.css';

// Mapeamento de imagens para cada álbum
const albumImages = {
  1: '/images/taylorswift2.jpg',
  2: '/images/fearless2.jpg',
  3: '/images/speaknow.jpg',
  4: '/images/red.jpg',
  5: '/images/1989.jpg',
  6: '/images/reputation.jpg',
  7: '/images/lover.jpg',
  8: '/images/folklore.jpg',
  9: '/images/evermore.jpg',
  10: '/images/midnights.jpg',
  11: '/images/ttpd.jpg',
};

// Função para contar inversões
function countInversions(arr1, arr2) {
  let inversions = 0;
  const indexMap = arr2.reduce((map, item, index) => {
    map[item] = index;
    return map;
  }, {});

  for (let i = 0; i < arr1.length; i++) {
    for (let j = i + 1; j < arr1.length; j++) {
      if (indexMap[arr1[i]] > indexMap[arr1[j]]) {
        inversions++;
      }
    }
  }
  return inversions;
}

const Comparar = () => {
  const location = useLocation();
  const [userRanking, setUserRanking] = useState([]);
  const [friendRanking, setFriendRanking] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [pageColor, setPageColor] = useState('#FFFFFF');
  const [headerColor, setHeaderColor] = useState('#000000');
  const [headerTextColor, setHeaderTextColor] = useState('#FFFFFF');

  // Calcula a similaridade usando useMemo
  const similarity = useMemo(() => {
    if (userRanking.length && friendRanking.length) {
      const inversions = countInversions(userRanking, friendRanking);
      const maxInversions = (userRanking.length * (userRanking.length - 1)) / 2;
      return ((1 - inversions / maxInversions) * 100).toFixed(2);
    }
    return 0;
  }, [userRanking, friendRanking]);

  useEffect(() => {
    if (location.state) {
      const { myRanking, friendRanking, selectedAlbum, albums } = location.state;

      // Garantir que rankings existam antes de usá-los
      if (myRanking && friendRanking) {
        setUserRanking(myRanking);
        setFriendRanking(friendRanking);
      }

      if (selectedAlbum) {
        setSelectedAlbum(selectedAlbum);

        const album = albums?.find(album => album.id === selectedAlbum);
        if (album) {
          setPageColor(album.pageColor || '#FFFFFF');
          setHeaderColor(album.headerColor || '#000000');
          setHeaderTextColor(album.headerTextColor || '#FFFFFF');
        }
      }
    }
  }, [location.state]);

  return (
    <div className="comparar" style={{ backgroundColor: pageColor }}>
      <Header style={{ backgroundColor: headerColor, color: headerTextColor }} />
      <main className="comparar-content">
        <h1>Resultado da Comparação</h1>
        {userRanking.length && friendRanking.length ? (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              Similaridade: {similarity}%
            </p>
          </div>
        ) : (
          <p>Dados insuficientes para realizar a comparação.</p>
        )}
        <div className="rankings">
          <div className="ranking">
            <h2>You</h2>
            <div className="album-row">
              {userRanking.map((albumId, index) => (
                <img
                  key={index}
                  src={albumImages[albumId]} // Busca a imagem pelo mapeamento
                  alt={`Álbum ${albumId}`}
                  className="album-image"
                />
              ))}
            </div>
          </div>
          <div className="ranking">
            <h2>Friend</h2>
            <div className="album-row">
              {friendRanking.map((albumId, index) => (
                <img
                  key={index}
                  src={albumImages[albumId]} // Busca a imagem pelo mapeamento
                  alt={`Álbum ${albumId}`}
                  className="album-image"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer style={{ textAlign: 'center', marginTop: '30px' }}>
        <p
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Similaridade: {similarity}%
        </p>
      </footer>
    </div>
  );
};

export default Comparar;
