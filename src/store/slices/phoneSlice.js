import { createSlice } from "@reduxjs/toolkit";

export const phoneSlice = createSlice({
  name: "phone",
  initialState: "",
  reducers: {
    setPhone: (state, action) => action.payload,
    clearPhone: () => "",
  },
});

export const { setPhone, clearPhone } = phoneSlice.actions;
export default phoneSlice.reducer;
