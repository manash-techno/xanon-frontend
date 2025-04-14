import { apiSlice } from "@/store/slices/apiSlice.ts";
import {
    iForgotPasswordRequest,
    iLoginRequest, iLoginResponse,
    iOAuthLoginResponse,
    iUserDetailsResponse
} from "@/types/authTypes.ts";
import {API_AUTH_PATHS} from "@/store/api/endpoints.ts";

export interface LogoutResponse {
    success: boolean;
    message: string;
}

export const authApi = apiSlice.injectEndpoints?.({
    endpoints: (builder) => ({
        login: builder.mutation<iLoginResponse, iLoginRequest>({
            query: (data) => ({
                url: API_AUTH_PATHS.LOGIN.path,
                method: API_AUTH_PATHS.LOGIN.method,
                body: data,
            }),
            invalidatesTags: ["Auth"],
            transformErrorResponse: (response) => {
                if (response.status === 401) {
                    return { message: "Invalid credentials. Please try again." };
                } else {
                    return { message: "An error occurred. Please try again later." };
                }
            },
        }),
        register: builder.mutation<{email: string, id: number}, { username: string; email: string; password: string }>({
            query: (data) => ({
                url: API_AUTH_PATHS.REGISTER.path,
                method: API_AUTH_PATHS.REGISTER.method,
                body: data,
            }),
        }),
        verifyOTP: builder.mutation<{message: string, error: string}, { user_id: string; otp_code: string }>({
            query: (data) => ({
                url: API_AUTH_PATHS.VERIFY_OTP.path,
                method: API_AUTH_PATHS.VERIFY_OTP.method,
                body: data,
            }),
        }),
        oauthLogin: builder.query<iOAuthLoginResponse, void>({
            query: () => ({
                url: API_AUTH_PATHS.OAUTH_LOGIN.path,
                method: API_AUTH_PATHS.OAUTH_LOGIN.method,
            }),
        }),
        forgotPassword: builder.mutation<void, iForgotPasswordRequest>({
            query: (data) => ({
                url: API_AUTH_PATHS.FORGOT_PASSWORD.path,
                method: API_AUTH_PATHS.FORGOT_PASSWORD.method,
                body: data,
            }),
        }),
        getUserDetails: builder.query<iUserDetailsResponse, void>({
            query: () => ({
                url: API_AUTH_PATHS.USER_DETAILS.path,
                method: API_AUTH_PATHS.USER_DETAILS.method,
            }),
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
        }),
        resetPassword: builder.mutation<void, { uid: string; new_password: string; token: string }>({
            query: (data) => ({
                url: API_AUTH_PATHS.RESET_PASSWORD.path,
                method: API_AUTH_PATHS.RESET_PASSWORD.method,
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useOauthLoginQuery, useRegisterMutation, useForgotPasswordMutation, useGetUserDetailsQuery, useLogoutMutation, useVerifyOTPMutation, useResetPasswordMutation } = authApi;
