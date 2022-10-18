import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraficaMontoComprado = () => {
  const transacciones = useSelector(
    (state) => state.transacciones.transacciones
  );

  const monedas = useSelector((state) => state.monedas.monedas);

  const nombreMonedaPorId = (idMoneda) =>
    monedas.find((m) => m.id === idMoneda).nombre;

  const [datosGrafica, setDatosGrafica] = useState([]);

  useEffect(() => {
    // El flujo de todo esto sería así. Las transacciones son filtradas por .filter() dejando solo las transacciones de tipo Compra, y luego con el metodo .reduce(), reducimos el array a un objeto de objetos que tiene el nombre de la moneda y la cantidad de cada una de ellas.
    // Object.values() acepta un objeto como parametro, y devuelve un array con sus propiedades, en este caso, al ser un objeto de objetos, nos desvuelve un array con esos objetos recien generados.

    let trnsFiltradasySumadas = Object.values(
      transacciones
        .filter((tran) => tran.tipo_operacion === 1)
        .reduce((agg, trans) => {
          if (agg[trans.moneda] === undefined)
            agg[trans.moneda] = {
              moneda: nombreMonedaPorId(trans.moneda),
              montoTotal: 0,
            };
          agg[trans.moneda].montoTotal += +trans.cantidad * trans.valor_actual;
          return agg;
        }, {})
    );

    setDatosGrafica(trnsFiltradasySumadas);
  }, [transacciones]);

  return (
    <div className="dashboard__item">
      <h2 className="dashboard__item-title">
        Total de $U por monedas compradas{' '}
      </h2>

      <div className="grafica">
        <Bar
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'none',
              },
              title: {
                display: true,
                text: 'Monto total de monedas compradas ($U)',
                position: 'top',
              },
            },
          }}
          data={{
            labels: datosGrafica.map((t) => t.moneda),
            datasets: [
              {
                label: '',
                data: datosGrafica.map((t) => t.montoTotal),
                backgroundColor: '#4db5ff',
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default GraficaMontoComprado;
