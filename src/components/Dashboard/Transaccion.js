import React from 'react';
import { useSelector } from 'react-redux';

const Transaccion = ({
  id,
  cantidad,
  moneda,
  tipo_operacion,
  valor_actual,
}) => {
  const monedas = useSelector((state) => state.monedas.monedas);
  return (
    <div className="dashboard__transaccion-item">
      <div>
        <p>
          <b>Id: </b>
          {id} | <b>Tipo de Operacion:</b>
          {tipo_operacion === 1 ? ' Compra' : ' Venta'}
        </p>
        <p>
          <b> Cantidad:</b> {cantidad} | <b>Moneda:</b>{' '}
          {monedas.find((m) => m.id === moneda).nombre} | <b>Valor:</b> $
          {valor_actual}
        </p>
      </div>
    </div>
  );
};

export default Transaccion;
