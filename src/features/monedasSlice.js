import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  monedas: [],
};

export const monedasSlice = createSlice({
  name: 'monedasSlice',
  initialState,
  reducers: {
    guardarMonedas: (state, action) => {
      state.monedas = action.payload;
    },
  },
});

export const { guardarMonedas, cotizacionPorId } = monedasSlice.actions;

export default monedasSlice.reducer;
