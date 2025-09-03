import { ENV_CORS_ORIGINS, ENV_GEMINI_API_KEY, ENV_MONGODB_URI, ENV_PORT } from "../_shared";

export const appConfig = {
    port: process.env[ENV_PORT] || 3333,
    corsOrigins: process.env[ENV_CORS_ORIGINS] || 'http://localhost:4200',
    mongodbUri: process.env[ENV_MONGODB_URI] || 'mongodb://localhost:27017/javis',
    geminiApiKey: process.env[ENV_GEMINI_API_KEY],
}