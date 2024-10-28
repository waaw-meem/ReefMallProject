import { apiSlice } from "../../api/ApiSlice";

export const UserApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    userProfile: builder.query({
      query: () => `/users/me`,
    }),
    updateUserProfile: builder.mutation({
      query: (data: any) => ({
        url: `/users/${data?.id}`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data: any) => ({
        // url: `/forgot`,
        url: `/resend-otp`,
        method: "POST",
        body: { ...data },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: any) => ({
        url: `/reset-password`,
        method: "POST",
        body: { ...data },
      }),
    }),
    changePassword: builder.mutation({
      query: (data: any) => ({
        url: `/auth/change-password`,
        method: "POST",
        body: { ...data },
      }),
    }),
    otpVerification: builder.mutation({
      query: (data: any) => ({
        url: `/otp-verify`,
        method: "POST",
        body: { ...data },
      }),
    }),
    createAccount: builder.mutation({
      query: (data: any) => ({
        url: `/signup`,
        method: "POST",
        body: { ...data },
      }),
    }),
    logIn: builder.mutation({
      query: (data: any) => ({
        url: `/login`,
        method: "POST",
        body: { ...data },
      }),
    }),
    resetOtpVerify: builder.mutation({
      query: (data: any) => ({
        url: `/reset-otp-verify`,
        // url: `/reset-otp`,
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useUserProfileQuery,
  useUpdateUserProfileMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useOtpVerificationMutation,
  useCreateAccountMutation,
  useLogInMutation,
  useResetOtpVerifyMutation,
} = UserApiSlice;
