import { config } from "dotenv";

config();

export const { LOG_FORMAT, LOG_DIR, ACCESS_TOKEN } = process.env;
