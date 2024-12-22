import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Pareamento() {
  const [friendUsername, setFriendUsername] = useState('');
  const [friendData, setFriendData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        body: JSON.stringify({ username: friendUsername}),
      });

      if (!response.ok) {
        throw new Error('Amigo não encontrado ou não completou o rankeamento.');
      }

      const data = await response.json();
      setFriendData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setFriendData(null);
    }
  };

  const handleCompareRankings = () => {
    if (friendData) {
      navigate('/comparar', { state: { myRanking: friendData.myRanking, friendRanking: friendData.friendRanking } });
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
        <button onClick={handleSearchFriend}>Buscar Amigo</button>
      </div>
      {error && <p>{error}</p>}
      {friendData && (
        <div>
          <h3>Amigo Encontrado: {friendData.username}</h3>
          <button onClick={handleCompareRankings}>Comparar Rankings</button>
        </div>
      )}
    </div>
  );
}

export default Pareamento;
