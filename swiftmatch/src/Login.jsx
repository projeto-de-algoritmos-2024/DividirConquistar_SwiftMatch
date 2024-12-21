import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Para navegação
import './App.css'; // Arquivo CSS global

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para verificar se as credenciais estão corretas
    alert('Login realizado!');
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

      <p>
        <Link to="/criar-conta">Ainda não tem uma conta? Crie uma agora!</Link>
      </p>
    </div>
  );
}

export default Login;
