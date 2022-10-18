import { configureStore } from '@reduxjs/toolkit';
import transaccionesReducer from '../features/transaccionesSlice';
import monedasReducer from '../features/monedasSlice';

export const store = configureStore({
  reducer: {
    transacciones: transaccionesReducer,
    monedas: monedasReducer,
  },
});
