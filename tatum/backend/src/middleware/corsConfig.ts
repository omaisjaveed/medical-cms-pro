import cors from "cors";

const allowedOrigins = [
  ...(process.env.CLIENT_URL?.split(",").map(url => url.trim().replace(/\/$/, "")) || []),
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://tatumwellness.devnode.amgdigitalagency.com",
  "https://tatumwellness.devnode.amgdigitalagency.com",
];

const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS policy: origin ${origin} not allowed`));
  },
  credentials: true,
};

export default cors(corsOptions);
