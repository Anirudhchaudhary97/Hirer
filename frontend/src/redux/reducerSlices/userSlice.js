import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoading(state, actions) {
      state.isLoading = actions.payload;
    },
  },
});

export const { setLoading } = userSlice.actions;
export default userSlice.reducer;
