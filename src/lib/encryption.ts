import { envConfig } from "@/config/env.ts";

const k = atob(envConfig.ENCRYPTION_KEY).slice(0, 16).repeat(2).slice(0, 16);

const xor = (d: string) => d.split("").map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ k.charCodeAt(i % k.length))).join("");

export const encrypt = (d: string) => btoa(xor(d));
export const decrypt = (d: string) => xor(atob(d));
