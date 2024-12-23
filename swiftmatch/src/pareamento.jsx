import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Pareamento() {
  const [friendUsername, setFriendUsername] = useState('');
  const [friendData, setFriendData] = useState(null);
  const [error, setError] = useState('');
  const [myRanking, setMyRanking] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
        // Altera o estilo de fundo do body quando a página 'Home' for renderizada
        document.body.style.backgroundColor = '#fcdca4'; 
      
        // Limpa o estilo quando a página for desmontada para não afetar outras páginas
        return () => {
          document.body.style.backgroundColor = ''; 
        };
    }, []);

  useEffect(() => {
    const fetchMyRanking = async () => {
      const userId = localStorage.getItem('userId');

      if (userId) {
        try {
          const response = await fetch(`http://localhost:5000/api/get-ranking?userId=${userId}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar o ranking do usuário');
          }
          const data = await response.json();
          console.log('Ranking do usuário obtido:', data);
          setMyRanking(data.ranking); // Armazena o ranking do usuário
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchMyRanking();
  }, []);

  const handleSearchFriend = async () => {
    const userId = localStorage.getItem('userId'); // Obtém o ID do usuário logado

    if (!friendUsername) {
      setError('Por favor, insira um nome de usuário.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/find-friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: friendUsername }),
      });

      if (!response.ok) {
        throw new Error('Amigo não encontrado ou não completou o rankeamento.');
      }

      const data = await response.json();
      console.log('Dados do amigo encontrados:', data);

      setFriendData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setFriendData(null);
    }
  };

  const handleCompareRankings = () => {
    if (friendData) {
      console.log('Enviando para a próxima página os seguintes dados:');
      console.log('Meu Ranking:', myRanking);
      console.log('Ranking do Amigo:', friendData.friendRanking);
      navigate('/comparar', { state: { myRanking, friendRanking: friendData.friendRanking } });
    }
  };

  return (
    <div className="pareamento">
      <h2>Pareamento de Amigos</h2>
      <div>
        <input
          type="text"
          placeholder="Digite o username do amigo"
          value={friendUsername}
          onChange={(e) => setFriendUsername(e.target.value)}
        />
        <button 
          onClick={handleSearchFriend} 
          style={{ backgroundColor: '#1c141c', color: '#fcdca4' }} // Cor do botão de buscar amigo
        >
          Buscar Amigo
        </button>
      </div>
      {error && <p>{error}</p>}
      {friendData && (
        <div>
          <h3>Amigo Encontrado: {friendData.username}</h3>
          <button 
            onClick={handleCompareRankings} 
            style={{ backgroundColor: '#1c141c', color: '#fcdca4' }} // Cor do botão de comparar rankings
          >
            Comparar Rankings
          </button>
        </div>
      )}
    </div>
  );
}

export default Pareamento;
