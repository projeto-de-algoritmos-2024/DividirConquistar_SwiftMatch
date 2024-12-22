import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importando useNavigate para redirecionamento
import './App.css'; // Arquivo CSS global

function Login() {

  useEffect(() => {
      // Altera o estilo de fundo do body quando a página 'Home' for renderizada
      document.body.style.backgroundColor = '#ececec'; 
      
  
      // Limpa o estilo quando a página for desmontada para não afetar outras páginas
      return () => {
        document.body.style.backgroundColor = ''; 
      };
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Para exibir erros
  const navigate = useNavigate(); // Hook para navegação após login

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);

    try {
      // Enviar as credenciais para o backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        // Se o login for bem-sucedido, redirecionar para a página da conta
        navigate('/conta'); // Aqui você redireciona para a página interna da conta
      } else {
        // Caso ocorra algum erro, exibir a mensagem de erro
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao tentar fazer login');
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
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

        <button type="submit" className="submit-btn">Entrar</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p>
        <Link to="/criar-conta">Ainda não tem uma conta? Crie uma agora!</Link>
      </p>
    </div>
  );
}

export default Login;
