import app from "./app";
import sequelize, { connectDB } from "./config/database";
import { User } from "./models/index";

const PORT = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';

const startServer = async () => {
  try {
    // 1. Connect to Database
    try {
      await connectDB();
      console.log("✅ Database connection established successfully.");
    } catch (dbError: any) {
      if (!isProduction) {
        console.warn('Database connection failed. App will start but DB features may not work.', dbError.message);
      }
    }

    // 2. Sync Models
    await sequelize.sync({ alter: false });
    console.log("✅ Database models synchronized.");

    // 3. Start Listening
    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`✅ Backend is running from new build`);
    });

  } catch (error: any) {
    console.error('❌ Failed to start server:', error.message);
    // Fallback start if possible
    app.listen(Number(PORT) || 4000, '0.0.0.0', () => {
      console.log('Server started in fallback mode');
    });
  }
};

startServer();
