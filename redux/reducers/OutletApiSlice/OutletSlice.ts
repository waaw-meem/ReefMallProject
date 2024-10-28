import OutletAction from "@/redux/actions/OutletAction";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  brand: null,
};
export const OutletSlice = createSlice({
  name: "outlet",
  initialState,
  reducers: OutletAction,
});

export const OutletActionCalls = OutletSlice.actions;
export default OutletSlice.reducer;

export const selectOutlet = (state: any) => state.Outlet.brand;
