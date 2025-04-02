export const envConfig = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com/api/",
    HOMEPAGE: import.meta.env.VITE_HOMEPAGE || "/",
    PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL || "http://localhost:3000/",
    DEBUG: import.meta.env.VITE_DEBUG === "true",
    ENCRYPTION_KEY: import.meta.env.VITE_ENCRYPTION_KEY || "U29tZVNlY3JldEtleTIzNDU=",
};

