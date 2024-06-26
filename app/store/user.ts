import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  token: string;
}

const initialState: UserState = {
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken, logout } = userSlice.actions;

export default userSlice.reducer;
