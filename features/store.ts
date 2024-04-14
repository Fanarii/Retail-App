import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import cartSlice from './cartSlice'
import historySlice from './historySlice'

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    history: historySlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export default store
