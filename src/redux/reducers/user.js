import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

    },
    setToken: (state, action) => {
      // localStorage.setItem("token", action.payload);
      state.token = action.payload;
    }
    // setUser: (state, action) => {
    //   const storedUser = JSON.parse(localStorage.getItem('user'));
    //   storedUser ? storedUser : state.user = action.payload;

    // },
    // setToken: (state, action) => {
    //   const storedToken = localStorage.getItem('token');
    //   storedToken ? storedToken : state.token = action.payload;
    // }
  }
});

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;
