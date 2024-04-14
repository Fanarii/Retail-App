import type { ProductInterface } from '@/interfaces'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ProductState {
  loading: boolean
  products: ProductInterface[]
  error: string
}

const initialState: ProductState = {
  loading: false,
  products: [],
  error: ''
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/api/products')
  return response.data
})

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.error = ''
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch products'
      })
  }
})

export default productSlice.reducer
