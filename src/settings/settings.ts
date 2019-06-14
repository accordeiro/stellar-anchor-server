import { config } from "dotenv";

config();

// Config variables that are used across the application:
const JWT_SECRET: string = process.env.JWT_SECRET || "";
const DEFAULT_JWT_DURATION: string = process.env.DEFAULT_JWT_DURATION || "7d";
const PORT = process.env.PORT || 8080;

if (JWT_SECRET === "") {
  throw new Error("JWT_SECRET must be set");
}

export default { JWT_SECRET, DEFAULT_JWT_DURATION, PORT };
