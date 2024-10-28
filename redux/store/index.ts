"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/ApiSlice";
// import { DashboardSlice } from "../reducers/DashboardSlice/DashboardSlice";
// import { ForgotSlice } from "../reducers/ForgotSlice/ForgotSlice";
// import { DraftApiSlice } from "../reducers/DraftSlice/LeadApiSlice";
// import { DraftByIdApi } from "../reducers/DraftByIdSlice/DraftByIdApiSlice";
// import cloneSlice from "../reducers/CloneSlice/cloneSlice";
import { UserSlice } from "../reducers/UserSlice/UserSlice";
import { OutletSlice } from "../reducers/OutletApiSlice/OutletSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // Dashboard: DashboardSlice.reducer,
    // Forgot: ForgotSlice.reducer,
    // Draft: DraftApiSlice.reducer,
    // draftById: DraftByIdApi.reducer,
    // data: cloneSlice,
    Outlet: OutletSlice.reducer,
    User: UserSlice.reducer,
  },
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: false, // Disable serializable state checking
  //   }).concat(apiSlice.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state checking
    }).concat(apiSlice.middleware),
  devTools: true,
});
