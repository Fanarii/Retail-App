/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState } from './store'
import { type ProductInterface, type ItemInterface } from '@/interfaces'

interface CartState {
  items: ItemInterface[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductInterface>) => {
      const { items } = state
      const existingItem = items.find((item) => item.name === action.payload.name)
      if (existingItem != null) {
        existingItem.quantity += 1
      } else {
        const newItem: ItemInterface = {
          name: action.payload.name,
          marketPrice: action.payload.marketPrice ?? 0,
          quantity: 1
        }
        state.items.push(newItem)
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((item) =>
        item.name === action.payload && item.quantity >= 1 ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0)
    },
    removeAllItems: (state) => {
      state.items = []
    }
  }
})

export const { addItem, removeItem, removeAllItems } = cartSlice.actions

export const selectItems = (state: RootState) => state.cart.items
// tambahkan selectors lain jika diperlukan

export default cartSlice.reducer
