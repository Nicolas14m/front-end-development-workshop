import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FaRegDotCircle } from 'react-icons/fa';

const SugerenciaIA = () => {
  const monedas = useSelector((state) => state.monedas.monedas);

  const transacciones = useSelector(
    (state) => state.transacciones.transacciones
  );

  const [ultimasTrans, setUltimasTrans] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);

  const nombreMonedaPorId = (idMoneda) =>
    monedas.find((m) => m.id === idMoneda).nombre;

  useEffect(() => {
    let ultimasTransPorMoneda = [];
    let arraySugerencias = [];

    // Recorremos el array de transacciones empezando por la ultima, si no existe esa moneda, se agrega la transacción.
    for (let i = transacciones.length - 1; i >= 0; i--) {
      if (
        !ultimasTransPorMoneda.some((t) => t.moneda === transacciones[i].moneda) // .some deja de recorrer al encontrar una coincidencia
      )
        ultimasTransPorMoneda.push(transacciones[i]);
    }

    setUltimasTrans(ultimasTransPorMoneda);

    ultimasTransPorMoneda.forEach((trans) => {
      if (trans.tipo_operacion === 1) {
        let cotizacionActual = monedas.find(
          (m) => m.id === trans.moneda
        ).cotizacion;

        if (trans.valor_actual < cotizacionActual) {
          arraySugerencias.push(
            `Se recomienda vender sus ${trans.cantidad} ${nombreMonedaPorId(
              trans.moneda
            )}`
          );
        }
      } else {
        let cotizacionActual = monedas.find(
          (m) => m.id === trans.moneda
        ).cotizacion;

        if (trans.valor_actual > cotizacionActual) {
          arraySugerencias.push(
            `Se recomienda comprar más ${nombreMonedaPorId(trans.moneda)}`
          );
        }
      }
    });

    setSugerencias(arraySugerencias);
  }, [transacciones]);

  return (
    <div className="dashboard__item">
      <h2 className="dashboard__item-title">Sugerencia IA</h2>

      <div className="recomendaciones">
        {sugerencias.length === 0
          ? 'No hay ninguna sugerencia por el momento.'
          : sugerencias.map((s, i) => (
              <p className="recomendacion" key={i}>
                <FaRegDotCircle className="rec-icon" /> {s}
              </p>
            ))}
      </div>
    </div>
  );
};

export default SugerenciaIA;
