// Utility functions for handling cookies
import {decrypt, encrypt} from "@/lib/encryption.ts";

const cookieUtils = {
    get: (name: string): string | null => {
        const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        if (match) {
            const decodedValue = decodeURIComponent(match[2]);
            return decrypt(decodedValue);
        }
        return null;
    },
    set: (name: string, value: string, days = 30) => {
        const encryptedValue = encrypt(value);
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${encodeURIComponent(encryptedValue)};expires=${expires.toUTCString()};path=/;secure;SameSite=Strict`;
    },
    remove: (name: string) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    },
};

// Implement Redux Persist Storage API
export const cookieStorage = {
    getItem: (key: string) => Promise.resolve(cookieUtils.get(key) || null),
    setItem: (key: string, value: string) => {
        cookieUtils.set(key, value);
        return Promise.resolve();
    },
    removeItem: (key: string) => {
        cookieUtils.remove(key);
        return Promise.resolve();
    },
};
