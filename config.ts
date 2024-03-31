import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "password",
        name: process.env.DB_NAME || "spotlite",
    }
}