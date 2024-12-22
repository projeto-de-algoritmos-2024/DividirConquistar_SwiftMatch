import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'; // Você pode usar o mesmo arquivo CSS

function CreateAccount() {

    useEffect(() => {
        // Altera o estilo de fundo do body quando a página 'Home' for renderizada
        document.body.style.backgroundColor = '#e4ccac'; 
        
    
        // Limpa o estilo quando a página for desmontada para não afetar outras páginas
        return () => {
          document.body.style.backgroundColor = ''; 
        };
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Para mensagens de erro
    const navigate = useNavigate(); // Usado para redirecionar para outra página
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        setErrorMessage('As senhas não coincidem!');
        return;
      }
  
      try {
        console.log('Enviando dados:', { username, password });  // Adicionado log
        const response = await axios.post('http://localhost:5000/api/register', {
          username,
          password,
        });
        console.log('Resposta do servidor:', response.data); // Log da resposta
        navigate('/login'); // Redireciona para a página de login
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.message || "Erro desconhecido");
        } else {
          setErrorMessage('Erro ao se comunicar com o servidor');
        }
      }  
    };
  
    return (
      <div className="create-account">
        <h2>Crie sua conta</h2>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Nome de usuário</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
  
          {errorMessage && <p className="error-message">{errorMessage}</p>}
  
          <button type="submit" className="submit-btn">Inscrever-se</button>
        </form>
  
        <p>
          <Link to="/login">Já tem uma conta? Faça o login</Link>
        </p>
      </div>
    );
  }
  
export default CreateAccount;