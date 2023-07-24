import dotenv from "dotenv";
dotenv.config();

export const AUTH_SECRET = process.env.AUTH_SECRET;
export const AUTH_BASE_URL = process.env.AUTH_BASE_URL;
export const AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID;
export const AUTH_ISSUER_BASE_URL = process.env.AUTH_ISSUER_BASE_URL;

export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
