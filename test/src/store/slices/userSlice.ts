import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  user: string;
  count: number;
};

const initialState: InitialState = {
  user: "juyeon",
  count: 0,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setCount(state, action) {
      state.count = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice;
