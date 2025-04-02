export interface iLoginRequest {
    email: string;
    password: string;
}

export interface iUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

export interface iLoginResponse {
    access: string;
    refresh: string;
    user: iUser|null;
}

export interface iOAuthLoginResponse {
    oauth_url: string;
}

export interface iForgotPasswordRequest {
    email: string;
}

export interface iUserDetailsResponse {
    seller_id: string;
}