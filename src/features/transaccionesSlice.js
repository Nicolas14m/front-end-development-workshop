import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transacciones: [],
};

export const transaccionesSlice = createSlice({
  name: 'transaccionesSlice',
  initialState,
  reducers: {
    guardarTransacciones: (state, action) => {
      state.transacciones = action.payload;
    },
    agregarTransaccion: (state, action) => {
      state.transacciones.push(action.payload);
    },
  },
});

export const { guardarTransacciones, agregarTransaccion } =
  transaccionesSlice.actions;

export default transaccionesSlice.reducer;
