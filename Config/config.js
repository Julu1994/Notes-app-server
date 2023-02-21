import dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT: process.env.PORT,
    DB_LINK: process.env.DB_LINK,
    JWT_SECRET: process.env.JWT_SECRET,
};
