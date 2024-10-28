import { createSlice } from "@reduxjs/toolkit";
import UserAction from "../../actions/UserAction";

const initialState = {
  User: null,
  Email: "",
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: UserAction,
});

export const UserActionCalls = UserSlice.actions;

export default UserSlice.reducer;

export const selectCurrentUser = (state: any) => state.User.User;
export const selectEmail = (state: any) => state.User.Email;
