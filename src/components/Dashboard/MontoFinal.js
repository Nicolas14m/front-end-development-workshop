import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const MontoFinal = () => {
  const transacciones = useSelector(
    (state) => state.transacciones.transacciones
  );

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let total = 0;

    transacciones.forEach((tran) => {
      total +=
        tran.cantidad *
        tran.valor_actual *
        (tran.tipo_operacion === 1 ? -1 : 1);
    });

    setBalance(total);
  }, [transacciones]);

  return (
    <div className="dashboard__item">
      <h2 className="dashboard__item-title">Balance</h2>
      <div className={balance >= 0 ? 'numero_positivo' : 'numero_negativo'}>
        $U {balance.toLocaleString(undefined, { minimumFractionDigits: 1 })}
      </div>
    </div>
  );
};

export default MontoFinal;
