import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET: string = process.env.JWT_SECRET || "supersecretjwtkey";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Log what we're receiving and searching for
    console.info(`[Login] Attempting login for email: "${email}"`);
    
    // Use trim and lowercase for more robust email matching
    const cleanEmail = email.trim().toLowerCase();
    
    // Use raw: true to get the data directly from the DB, bypassing any Sequelize instance issues
    let finalUser = await User.findOne({ 
      where: { email: cleanEmail },
      raw: true
    });

    if (!finalUser) {
      // Try finding without lowercase just in case
      finalUser = await User.findOne({ 
        where: { email: email.trim() },
        raw: true
      });
      
      if (!finalUser) {
        console.warn(`[Login] User not found: ${email}`);
        return res.status(401).json({
          success: false,
          message: "Invalid credentials (User not found v3)"
        });
      }
    }

    // DEBUG: Log exactly what we got from DB
    console.info(`[Login] DB result for ${finalUser.email}:`, {
      hasId: !!finalUser.id,
      hasPassword: !!finalUser.password,
      passwordType: typeof finalUser.password,
      passwordLength: finalUser.password ? finalUser.password.length : 0
    });

    if (!finalUser.password) {
      console.warn(`[Login] Password field is empty in DB for user: ${finalUser.email}`);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (Password missing in DB v3)"
      });
    }

    // 1. First attempt with bcryptjs (standard)
    let isPasswordValid = await bcrypt.compare(password, finalUser.password);
    
    // 2. Fallback: If standard bcrypt fails, try a simple match for legacy/unhashed cases
    if (!isPasswordValid && password === finalUser.password) {
      console.warn(`[Login] Plain text password match detected for ${email}`);
      isPasswordValid = true;
    }

    // 3. Extra check: Trim password just in case there are trailing spaces in DB or input
    if (!isPasswordValid) {
      const trimmedInputPassword = password.trim();
      const trimmedDBPassword = finalUser.password.trim();
      
      if (trimmedInputPassword === trimmedDBPassword) {
        console.warn(`[Login] Trimmed password match detected for ${email}`);
        isPasswordValid = true;
      } else {
        // Also try bcrypt with trimmed password
        isPasswordValid = await bcrypt.compare(trimmedInputPassword, finalUser.password);
      }
    }

    console.info(`[Login] Password valid for ${email}: ${isPasswordValid}`);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials (Password mismatch v3)"
      });
    }

    const token = jwt.sign(
      { id: finalUser.id, email: finalUser.email, role: finalUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as any
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: finalUser.id,
          email: finalUser.email,
          name: finalUser.name,
          role: finalUser.role
        }
      }
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required"
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ where: { email: cleanEmail } });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: "Editor",
      status: "Active"
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } as any
    );

    res.json({
      success: true,
      message: "Registration successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    // In a stateless JWT implementation, logout is handled client-side
    // by removing the token from client storage
    res.json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
