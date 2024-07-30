import { configureStore } from "@reduxjs/toolkit";

import phoneReducer from "./slices/phoneSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    phone: phoneReducer,
    auth: authReducer,
  },
});
