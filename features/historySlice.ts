import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type HistoryInterface } from '@/interfaces'

interface historyState {
  loading: boolean
  history: HistoryInterface[]
  error: string
}

export const fetchHistory = createAsyncThunk('history/fetchHistory', async () => {
  const response = await axios.get('/api/history')
  return response.data
})

const initialState: historyState = {
  loading: false,
  history: [],
  error: ''
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.loading = false
        state.history = action.payload
        state.error = ''
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to fetch products'
      })
  }
})

export default historySlice.reducer
