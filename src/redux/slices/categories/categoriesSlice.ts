import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchCategories = createAsyncThunk('users/fetchcategories', async () => {
  try {
    const response = await api.get('/mock/e-commerce/categories.json')
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export type Categories = {
  id: number
  name: string
}

export type categoriesState = {
  categories: []
  isLoading: boolean
  error: null | string
  searchTerm: string
}

const initialState: categoriesState = {
  categories: [],
  isLoading: false,
  error: null,
  searchTerm: ''
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory: (state, action) => {
      state.categories.push(action.payload)
    },
    searchCategories: (state, action) => {
      state.searchTerm = action.payload
    },

    deleteCategories: (state, action) => {
      const filterCategories = state.categories.filter((Category) => Category.id != action.payload)
      state.categories = filterCategories
    },
    updateCategory: (state, action) => {
      const { Categories, id } = action.payload
      const foundCategory = state.categories.find((catrgory) => catrgory.id == id)
      if (foundCategory) {
        foundCategory.name = Categories
        state.categories = foundCategory
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || 'some error happened!'
        state.isLoading = false
      })
  }
})

export const { searchCategories, deleteCategories, updateCategory, createCategory } =
  categoriesSlice.actions
export default categoriesSlice.reducer
