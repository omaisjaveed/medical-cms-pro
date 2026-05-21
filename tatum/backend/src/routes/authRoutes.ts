import express from "express";
import { login, logout, register } from "../controllers/authController";
import { authLimiter } from "../middleware/rateLimiter";

const router = express.Router();
router.post("/login", authLimiter, login);
router.post("/register", authLimiter, register);
router.post("/logout", logout);

export default router;
