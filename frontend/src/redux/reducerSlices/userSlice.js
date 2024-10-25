import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  user:null
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoading(state, actions) {
      state.isLoading = actions.payload;
    },
    setUser(state, actions) { 
      state.user = actions.payload;
    },
  },
});

export const { setLoading ,setUser} = userSlice.actions;
export default userSlice.reducer;
