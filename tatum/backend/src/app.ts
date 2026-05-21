import express from "express";
import dotenv from "dotenv";

// Load .env at the very top of the module
dotenv.config();

import helmet from "helmet";
import cookieParser from "cookie-parser";
import corsConfig from "./middleware/corsConfig";
import { generalLimiter } from "./middleware/rateLimiter";
import errorHandler from "./middleware/errorHandler";
import routes from "./routes/index";
import apiPrefixMiddleware from "./middleware/apiPrefix";
import path from "path";

// Disable verbose console logs in production
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.debug = () => {};
  // Keep console.info and console.error for critical lifecycle and error logging
}

const app = express();

// Enable trust proxy for rate limiting (essential if behind Nginx/Load Balancer)
app.set('trust proxy', 1);

// 1. Static Files (Uploads) - Serve this BEFORE any prefix middleware
const uploadsPath = process.env.UPLOAD_PATH || "uploads";
const absoluteUploadsPath = process.env.UPLOAD_DIR ? path.resolve(process.cwd(), process.env.UPLOAD_DIR) : path.resolve(process.cwd(), uploadsPath);

console.info(`[Server] Serving static files from: ${absoluteUploadsPath} at /${uploadsPath}`);

app.use(`/${uploadsPath}`, express.static(absoluteUploadsPath, { 
  maxAge: "1d",
  fallthrough: true 
}));

// Also serve at /tatumwellness-api/uploads for production consistency
app.use(`/tatumwellness-api/${uploadsPath}`, express.static(absoluteUploadsPath, { 
  maxAge: "1d",
  fallthrough: true 
}));

// 2. API Prefix Middleware (Handles /tatumwellness-api)
app.use(apiPrefixMiddleware);

// 3. Security & Global Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  })
);
app.use(corsConfig);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(generalLimiter);

// 4. Base Routes
app.get("/", (req, res) => {
  res.json({ success: true, message: "Tatum Wellness CMS backend is running from new build" });
});

app.get("/health", (req, res) => {
  res.json({ 
    success: true, 
    status: "online", 
    env: process.env.NODE_ENV,
    basePath: process.env.APP_BASE_PATH 
  });
});

// 5. API Routes
const apiRoutePrefix = process.env.API_PREFIX || "/api/v1";
app.use(apiRoutePrefix, routes);

// 6. Error Handler
app.use(errorHandler);

export default app;
