import React from 'react';
import Header from './Header'; // Importando o cabeçalho

function Conta() {
  return (
    <div className="conta">
      <Header /> {/* Chamando o componente de cabeçalho */}

      <main className="conta-content">
        <h2>Bem-vindo à sua conta!</h2>
        <p>Aqui você pode gerenciar suas informações, preferências, e muito mais.</p>
        
        {/* Adicione aqui mais conteúdo da conta do usuário */}
      </main>
    </div>
  );
}

export default Conta;
