import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: window.sessionStorage.getItem('user') ? JSON.parse(window.sessionStorage.getItem('user')) : undefined,
  },
  reducers: {
    LOGIN: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      window.sessionStorage.setItem('user', JSON.stringify(action.user));
      state.user = action.user;
    },
    LOGOUT: (state) => {
      window.sessionStorage.removeItem("user");
      state.user = undefined
    },
  },
})

// Action creators are generated for each case reducer function
export const { LOGIN, LOGOUT } = userSlice.actions

export default userSlice.reducer