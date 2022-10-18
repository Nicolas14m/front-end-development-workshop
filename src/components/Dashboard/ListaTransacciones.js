import React from 'react';
import Transaccion from './Transaccion';
import { useSelector } from 'react-redux';

const ListaTransacciones = () => {
  const transacciones = useSelector(
    (state) => state.transacciones.transacciones
  );

  return (
    <div className="dashboard__item">
      <h2 className="dashboard__item-title">Transacciones</h2>

      <div>
        {transacciones.length === 0
          ? 'No ha realizado ninguna transacción.'
          : ''}
      </div>

      <div className="transacciones">
        {transacciones.map((trans) => (
          <Transaccion key={trans.id} {...trans} />
        ))}
      </div>
    </div>
  );
};

export default ListaTransacciones;
