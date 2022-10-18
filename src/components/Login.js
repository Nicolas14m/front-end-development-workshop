import React from 'react';
import { useRef, useState, useEffect } from 'react';

//* React Router
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const usuarioRef = useRef(null);
  const passwordRef = useRef(null);

  let navigate = useNavigate();

  useEffect(() => {
    let apiKey = localStorage.getItem('apiKey');
    let idUsuario = localStorage.getItem('idLogueado');

    if (apiKey && idUsuario) {
      navigate('/dashboard');
    }
  }, []);

  const [mensajeError, setMensajeError] = useState('');

  const login = () => {
    let usuario = usuarioRef.current.value;
    let password = passwordRef.current.value;

    try {
      if (!usuario) {
        throw 'Ingrese un nombre de usuario!';
      }

      if (!password) {
        throw 'Ingrese una contraseña!';
      }

      let usuarioLog = { usuario, password };

      fetch('https://crypto.develotion.com/login.php', {
        method: 'POST',
        body: JSON.stringify(usuarioLog),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.codigo === 409) {
            setMensajeError(data.mensaje);
          } else if (data.codigo === 200) {
            setMensajeError('Login exitoso.');

            localStorage.setItem('apiKey', data.apiKey);
            localStorage.setItem('idLogueado', data.id);
            localStorage.setItem('usuario', usuario);

            navigate('/dashboard');
          }
        });
    } catch (error) {
      setMensajeError(error);
    }
  };

  return (
    <div className="container">
      <div className="form__wrapper">
        <form action="">
          <h1>Login</h1>
          <label htmlFor="usuario">
            Usuario:
            <input
              ref={usuarioRef}
              type="text"
              name="usuario"
              placeholder="Ingrese Usuario"
              required
            />
          </label>

          <label htmlFor="password">
            Contraseña:
            <input
              ref={passwordRef}
              type="password"
              name="password"
              placeholder="Ingrese contraseña"
              required
            />
          </label>
          <button onClick={login} type="button" className="btn btn-primary">
            Login
          </button>
          <div>
            No estas registrado?
            <Link className="link" to="/registro">
              {' '}
              Registrate!
            </Link>
          </div>
          <p>{mensajeError}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
