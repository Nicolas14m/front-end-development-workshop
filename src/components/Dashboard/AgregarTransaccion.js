import React from 'react';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { agregarTransaccion } from '../../features/transaccionesSlice';
import { useDispatch } from 'react-redux';

const AgregarTransaccion = () => {
  const dispatch = useDispatch();

  const cantidadRef = useRef(null);
  const monedaRef = useRef(null);
  const operacionRef = useRef(null);

  const monedas = useSelector((state) => state.monedas.monedas);

  const [estadoTransaccion, setEstadoTransaccion] = useState('');
  const [totalTransaccion, setTotalTransaccion] = useState(0);

  const actualizarTotal = () => {
    if (Number(monedaRef.current.value) !== -1) {
      const monedaBuscada = monedas.find(
        (moneda) => Number(moneda.id) === Number(monedaRef.current.value)
      );

      setTotalTransaccion(monedaBuscada.cotizacion * cantidadRef.current.value);
    } else {
      setTotalTransaccion(0);
    }
  };

  const transaccion = () => {
    let tipoOperacion = operacionRef.current.value;
    let cantidad = cantidadRef.current.value;
    let moneda = monedaRef.current.value; // Id moneda
    let idUsuario = localStorage.getItem('idLogueado');
    let apiKey = localStorage.getItem('apiKey');

    if (
      tipoOperacion !== '-1' &&
      cantidad > 0 &&
      moneda !== '-1' &&
      idUsuario
    ) {
      let monedaBuscada; // Objeto moneda con cotizacion y nombre

      if (Number(monedaRef.current.value) !== -1) {
        monedaBuscada = monedas.find(
          (moneda) => Number(moneda.id) === Number(monedaRef.current.value)
        );
      }

      let valorActual = monedaBuscada.cotizacion;

      let operacion = {
        idUsuario,
        tipoOperacion,
        moneda,
        cantidad,
        valorActual,
      };

      fetch('https://crypto.develotion.com/transacciones.php', {
        method: 'POST',
        headers: {
          apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(operacion),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.codigo === 200) {
            let operacionMemoria = {
              id: data.idTransaccion,
              idUsuario: Number(idUsuario),
              tipo_operacion: Number(tipoOperacion),
              moneda: Number(moneda),
              cantidad: Number(cantidad),
              valor_actual: valorActual,
            };

            dispatch(agregarTransaccion(operacionMemoria));
            setEstadoTransaccion(data.mensaje);
          } else {
            setEstadoTransaccion(data.mensaje);
          }
        });
    } else {
      setEstadoTransaccion(
        'Complete todos los campos para realizar una transacción. La cantidad de monedas debe ser mayor a 0.'
      );
    }
  };

  return (
    <div className="dashboard__item">
      <h2 className="dashboard__item-title">Agregar Transacción</h2>
      <form className="form__transaccion">
        <label htmlFor="cantidadMoneda">
          Cantidad:
          <input
            onChange={actualizarTotal}
            ref={cantidadRef}
            type="number"
            name="cantidadMoneda"
            placeholder="Ingrese cantidad de monedas"
            required
          />
        </label>

        <label htmlFor="moneda">
          Moneda:
          <select onChange={actualizarTotal} ref={monedaRef} required>
            <option value={-1}>Seleccione una moneda</option>
            {monedas.map((moneda) => (
              <option key={moneda.id} value={moneda.id}>
                1 {moneda.nombre} = ${moneda.cotizacion}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="moneda">
          Tipo de operación:
          <select ref={operacionRef} required>
            <option value={-1}>Seleccione un tipo de operación</option>
            <option value={1}>Compra</option>
            <option value={2}>Venta</option>
          </select>
        </label>

        <button onClick={transaccion} className="btn" type="button">
          Realizar Transacción
        </button>
        <p className="total__transaccion">
          Total: $U
          {totalTransaccion.toLocaleString(undefined, {
            minimumFractionDigits: 1,
          })}
        </p>
        <p>{estadoTransaccion}</p>
      </form>
    </div>
  );
};

export default AgregarTransaccion;
