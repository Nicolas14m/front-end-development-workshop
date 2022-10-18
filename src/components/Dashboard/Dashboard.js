import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { guardarTransacciones } from '../../features/transaccionesSlice';
import { guardarMonedas } from '../../features/monedasSlice';

import ListaTransacciones from './ListaTransacciones';
import AgregarTransaccion from './AgregarTransaccion';
import GraficaMontoComprado from './GraficaMontoComprado';
import GraficaMontoVendido from './GraficaMontoVendido';
import GraficaPorMoneda from './GraficaPorMoneda';
import SugerenciaIA from './SugerenciaIA';
import MontoFinal from './MontoFinal';
import Header from './Header';
import './dashboard.css';

const Dashboard = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let idUsuario = localStorage.getItem('idLogueado');
  let apiKey = localStorage.getItem('apiKey');

  //* Redirigir al login si no hay apiKey ni idUsuario
  useEffect(() => {
    if (!apiKey && !idUsuario) {
      navigate('/');
    }
  }, []);

  //* Para traer las monedas
  useEffect(() => {
    if (apiKey) {
      fetch('https://crypto.develotion.com/monedas.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          apiKey,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.codigo === 200) {
            dispatch(guardarMonedas(data.monedas));
            console.log(data.monedas);
          } else if (data.codigo === 401) {
            //! Error con la api
          }
        });
    } else {
      //! ApiKey invalida
    }
  }, []);

  //* Para traer transacciones
  useEffect(() => {
    if (idUsuario && apiKey) {
      fetch(
        `https://crypto.develotion.com/transacciones.php?idUsuario=${idUsuario}`,
        {
          method: 'GET',
          headers: {
            apiKey,
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.codigo === 200) {
            dispatch(guardarTransacciones(data.transacciones));
          } else {
            //*! Error con la api
          }
        });
    } else {
      //*! Error de autenticacion
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="dashboard__container container">
        <div className="row__A">
          <ListaTransacciones />
          <MontoFinal />
          <AgregarTransaccion />
        </div>

        <div className="row__B">
          <GraficaMontoComprado />
          <SugerenciaIA />
        </div>

        <div className="row__B">
          <GraficaMontoVendido />
          <GraficaPorMoneda />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
