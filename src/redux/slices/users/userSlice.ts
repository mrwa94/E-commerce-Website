import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../../api'

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await api.get('/mock/e-commerce/users.json')
    return response.data
  } catch (error) {
    console.log(error)
  }
})
export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  ban: boolean
  avatar: string
}

export type UserState = {
  users: User[]
  isLoading: boolean
  isLoggedIn: boolean
  userData: null | User
  userTerm: string
  error: null | string
  ban: boolean
}

const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []
const initialState: UserState = {
  users: [],
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  userTerm: '',
  error: null,
  ban: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    userLogout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    },
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    searchUser: (state, action) => {
      state.userTerm = action.payload
    },
    updateUserProfile: (state, action) => {
      const { id, firstName, lastName, email, password } = action.payload
      const foundUser = state.users.find((user) => user.id == id)
      if (foundUser) {
        foundUser.firstName = firstName
        foundUser.lastName = lastName
        foundUser.email = email
        foundUser.password = password
        state.userData = foundUser
      }
    },
    deleteUser: (state, action) => {
      const filterUser = state.users.filter((user) => user.id != action.payload)
      state.users = filterUser
    },
    banUser: (state, action) => {
      const id = action.payload
      const foundUser = state.users.find((state) => state.id == id)
      if (foundUser) {
        foundUser.ban = !foundUser.ban
      }
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message || 'some error happened!'
        state.isLoading = false
      })
  }
})
export const {
  userLogin,
  userLogout,
  addUser,
  searchUser,
  updateUserProfile,
  deleteUser,
  banUser
} = userSlice.actions
export default userSlice.reducer
