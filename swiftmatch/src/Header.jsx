import React, { useState, useEffect, useRef } from 'react';
import './Header.css'; // Certifique-se de ter o arquivo CSS
import { Link } from 'react-router-dom';

function Header({ style }) { // Adicionando 'style' como prop
  const [sidebarOpen, setSidebarOpen] = useState(false); // Controla a visibilidade da sidebar
  const sidebarRef = useRef(null); // Referência para a sidebar

  // Função para abrir e fechar a sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Função para fechar a sidebar ao clicar fora dela
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false); // Fecha a sidebar se o clique for fora
    }
  };

  // Usar useEffect para adicionar o listener de clique fora
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Adiciona o listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Limpa o listener ao desmontar o componente
    };
  }, []);

  return (
    <header className="header" style={style}> {/* Aplicando a cor através do 'style' */}
      <div className="header-container" style={style ? { backgroundColor: style.backgroundColor } : {}}>
        <h1 className="title" style={style ? { color: style.color } : { color: '#fff' }}>SwiftMatch</h1>
        <img 
          src="/images/3bars.png" 
          alt="Menu" 
          className="sidebar-toggle" 
          onClick={toggleSidebar} // Ação de clique para abrir a sidebar
        />
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div ref={sidebarRef} className="sidebar">
          <ul>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/configuracoes">Configurações</Link></li>
            <li><Link to="/sair">Sair</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
