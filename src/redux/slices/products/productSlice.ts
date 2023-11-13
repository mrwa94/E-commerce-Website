import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../../api'
import { Categories } from '../categories/categoriesSlice'

export const fetchProducts = createAsyncThunk('users/fetchProducts', async () => {
  try {
    const response = await api.get('/mock/e-commerce/products.json')
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: Categories[]
  variants: string[]
  sizes: string[]
  price: number
}

export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  singleProduct: Product
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  singleProduct: {} as Product
}

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    findProductById: (state, action) => {
      const id = action.payload
      const foundProduct = state.products.find((product) => product.id === id)
      if (foundProduct) {
        state.singleProduct = foundProduct
      }
    },
    searchProductByName: (state, action) => {
      state.searchTerm = action.payload
    },

    sortProduct: (state, action) => {
      const categories = action.payload
      if (categories === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      } else if (categories === 'id') {
        state.products.sort((a, b) => a.id - b.id)
      }
    },
    productsRequest: (state) => {
      state.isLoading = true
    },
    productsSuccess: (state, action) => {
      state.isLoading = false
      state.products = action.payload
    },
    addProduct: (state, action) => {
      // let's append the new product to the beginning of the array
      // state.products = [action.payload.product, ...state.products]

      state.products.push(action.payload)
    },
    removeProduct: (state, action: { payload: { productId: number } }) => {
      const filteredItems = state.products.filter(
        (product) => product.id !== action.payload.productId
      )
      state.products = filteredItems
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message || 'some error happened!'
        state.isLoading = false
      })
  }
})
export const {
  removeProduct,
  addProduct,
  productsRequest,
  productsSuccess,
  searchProductByName,
  findProductById,
  sortProduct
} = productsSlice.actions

export default productsSlice.reducer
