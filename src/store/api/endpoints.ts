export const API_AUTH_PATHS = {
    LOGIN: { path: "/auth/login", method: "POST" },
    REGISTER: { path: "/auth/users/", method: "POST" },
    OAUTH_LOGIN: { path: "/auth/oauth/login", method: "GET" },
    VERIFY_OTP: { path: "/auth/users/verify_otp/", method: "POST" },
    FORGOT_PASSWORD: { path: "/auth/users/reset_password/", method: "POST" },
    USER_DETAILS: { path: "/auth/users/me", method: "GET" },
} as const;
