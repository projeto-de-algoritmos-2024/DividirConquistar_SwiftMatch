import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Você pode usar o mesmo arquivo CSS

function CreateAccount() {
    // Estado para armazenar as entradas do formulário
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
      } else {
        // Aqui você pode adicionar lógica para inscrever o usuário (enviar os dados para um backend, por exemplo)
        alert('Conta criada com sucesso!');
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
  
          <button type="submit" className="submit-btn">Inscrever-se</button>
        </form>
  
        <p>
          <Link to="/login">Já tem uma conta? Faça o login</Link>
        </p>
      </div>
    );
  }
  
export default CreateAccount;