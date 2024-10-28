// const UserAction = {
//   LogIn: (state: any, action: any) => {
//     // console.log(action.payload);
//     // const {data} = action.payload;
//     state.User = action.payload;
//   },
//   SignUp: (state: any, action: any) => {
//     const { data } = action.payload;
//     state.User = data;
//   },
//   Reset: (state: any, action: any) => {
//     // const {data} = action.payload;
//     state.Email = action.payload;
//   },
// };

// export default UserAction;

// import { FRUser } from "@forgerock/javascript-sdk/src/index";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { useSession, getSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

// const GuestToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQyOWU4ZDRjZDBhNTFiZjYzNzMwODEiLCJlbWFpbCI6Imd1ZXN0QHlvcG1haWwuY29tIiwicm9sZSI6Imd1ZXN0IiwiaWF0IjoxNjkxNTI1MzAwLCJleHAiOjUwMTY5MTUyNTMwMH0.VOglkCUY_L6vx9Luub7V5YenBvcHbcjO2o-SsTmuo6Q`;

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://burjumanstrapi.demoz.agency/api",
  baseUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/api`,
  credentials: "same-origin",
  prepareHeaders: async (headers, { getState }) => {
    const session: any = await getSession();

    if (session && session.accessToken) {
      headers.set("Authorization", `Bearer ${session.accessToken}`);
    }

    // if (!session) {
    //   headers.set("authorization", `Bearer ${GuestToken}`);
    //   // headers.set('x-access-token', `${GuestToken}`);
    // }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args?: any,
  // api?: BaseQueryApi,
  api?: any,
  extraOptions?: any
) => {
  // let result = await baseQuery(args, api, extraOptions);
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  // if (result.error?.status === 401) {
  //   // FRUser.logout();
  //   signOut({ callbackUrl: "/sign-in" });
  //   toast.error("Session expired. Please log in again.");
  //   // console.log('yes');
  // }
  return result;
};

export const apiSlice: any = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
