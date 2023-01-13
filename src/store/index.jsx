import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './store';

const store = configureStore({
  reducer: { cart: cartSlice.reducer }
});

export default store;
