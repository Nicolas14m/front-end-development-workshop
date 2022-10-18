import React, { useEffect, useState, useRef } from 'react';

import { useSelector } from 'react-redux';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const GraficaPorMoneda = () => {
  const transacciones = useSelector(
    (state) => state.transacciones.transacciones
  );

  const monedas = useSelector((state) => state.monedas.monedas);

  const [datosGrafica, setDatosGrafica] = useState([]);

  const monedaRef = useRef(null);

  const trnsPorMoneda = () => {
    let trnsPorMoneda = 
      transacciones.filter(
        (tran) => tran.moneda === Number(monedaRef.current.value)
      );
    setDatosGrafica(trnsPorMoneda);
  };

  useEffect(() => {
    trnsPorMoneda();
  }, [transacciones]);

  const actualizarTabla = () => {
    trnsPorMoneda();
  };

  return (
    <div className="dashboard__item">
      <h2 className="dashboard__item-title">
        Histórico de cotizaciones por transacción{' '}
      </h2>

      <label htmlFor="moneda">
        <select onChange={actualizarTabla} ref={monedaRef} required>
          <option value={-1}>Seleccione una moneda</option>
          {monedas.map((moneda) => (
            <option key={moneda.id} value={moneda.id}>
              {moneda.nombre}
            </option>
          ))}
        </select>
      </label>

      {monedaRef === -1 ? (
        ''
      ) : (
        <div className="grafica">
          <Line
            className="chart"
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: '',
                },
              },
            }}
            data={{
              labels: datosGrafica.map((tran, index) => index + 1),
              datasets: [
                {
                  fill: true,
                  label: 'Valor al momento de la transacción',
                  data: datosGrafica.map((tran) => tran.valor_actual),
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default GraficaPorMoneda;
