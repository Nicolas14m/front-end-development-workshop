import React, { useRef, useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

const Registro = () => {
  //* Campos ref formulario registro
  const usuarioRef = useRef(null);
  const passwordRef = useRef(null);
  const departamentoRef = useRef(null);
  const ciudadRef = useRef(null);

  let navigate = useNavigate();

  const [departamentos, setDepartamentos] = useState([]);

  const [ciudades, setCiudades] = useState([]);

  const [mensajeError, setMensajeError] = useState('');

  //* Carga los departamentos al renderizar el elemento
  useEffect(() => {
    fetch('https://crypto.develotion.com/departamentos.php', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.codigo === 200) {
          setDepartamentos(data.departamentos);
        } else {
          setMensajeError('Problema con la API');
        }
      });
  }, []);

  //* Carga las ciudades al cambiar en el select de departamentos
  const cargarCiudades = () => {
    let departamentoId = departamentoRef.current.value;

    if (departamentoId !== '-1') {
      fetch(
        `https://crypto.develotion.com//ciudades.php?idDepartamento=${departamentoId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.codigo === 200) {
            setCiudades(data.ciudades);
          } else {
            setMensajeError('Problema con la API');
          }
        });
    } else {
      setMensajeError('Seleccione un departamento');
    }
  };

  const registro = () => {
    let usuario = usuarioRef.current.value;
    let password = passwordRef.current.value;
    let idDepartamento = departamentoRef.current.value;
    let idCiudad = ciudadRef.current.value;

    try {
      if (!usuario) {
        throw 'Ingrese un nombre de usuario!';
      }

      if (!password) {
        throw 'Ingrese una contraseña!';
      }

      if (idDepartamento === '-1') {
        throw 'Seleccione un departamento!';
      }

      if (idCiudad === '-1') {
        throw 'Seleccione una ciudad!';
      }

      let nuevoUsuario = {
        usuario,
        password,
        idDepartamento,
        idCiudad,
      };

      fetch('https://crypto.develotion.com/usuarios.php', {
        method: 'POST',
        body: JSON.stringify(nuevoUsuario),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.codigo === 409) {
            setMensajeError(data.mensaje);
          } else if (data.codigo === 200) {
            setMensajeError('Usuario registrado con éxito.');

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
          <h1>Registro</h1>
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

          <label htmlFor="departamento">
            Departamento:
            <select onChange={cargarCiudades} ref={departamentoRef} required>
              <option value={-1}>Seleccione un departamento</option>
              {departamentos.map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.nombre}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="ciudad">
            Ciudad:
            <select ref={ciudadRef} required>
              <option value={-1}>Seleccione una Ciudad</option>

              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </select>
          </label>

          <button onClick={registro} type="button" className="btn btn-primary">
            Registrarme
          </button>

          <div>
            ¿Ya tenés cuenta?
            <Link className="link" to="/">
              {' '}
              Logueate aquí
            </Link>
          </div>

          <p>{mensajeError}</p>
        </form>
      </div>
    </div>
  );
};

export default Registro;
