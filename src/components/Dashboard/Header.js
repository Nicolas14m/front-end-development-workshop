import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  let navigate = useNavigate();

  let usuario = localStorage.getItem('usuario');
  const cerrarSesion = () => {
    // localStorage.removeItem('idLogueado');
    // localStorage.removeItem('apiKey');
    window.localStorage.clear();
    navigate('/');
  };
  return (
    <header className="container">
      <h2>Bienvenido, {usuario}</h2>
      <button onClick={cerrarSesion} className="btn btn-primary">
        {' '}
        Cerrar Sesión
      </button>
    </header>
  );
};

export default Header;
