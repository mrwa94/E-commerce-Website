import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchOrder = createAsyncThunk('users/fetchOrder', async () => {
  try {
    const response = api.get('/mock/e-commerce/orders.json')
    return (await response).data
  } catch (error) {
    console.log(error)
  }
})

export type Orders = {
  id: number
  productId: number
  userId: number
  purchasedAt: string
}
export type orderState = {
  order: []
  isLoading: boolean
  error: null | string
  searchTerm: string
}

const initialState: orderState = {
  order: [],
  isLoading: false,
  error: null,
  searchTerm: ''
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteOrder: (state, action) => {
      const filterOrder = state.order.filter((orderDelete) => orderDelete.id != action.payload)
      state.order = filterOrder
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload
        state.isLoading = false
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.error = action.error.message || 'some error happened in order '
        state.isLoading = false
      })
  }
})
export const { deleteOrder } = orderSlice.actions
export default orderSlice.reducer
