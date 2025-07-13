import express, { application } from "express"
import { ENV } from "./config/env";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";
import {connectDB} from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";

const port = ENV.PORT || 3000;
const app=express();
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());
app.use(arcjetMiddleware);

app.get("/", (req, res) => res.send("Hello"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// Start server with proper async/await handling
const startServer = async () => {
  try {
    await connectDB();
    
    if (ENV.NODE_ENV != "production"){
      app.listen(port, () => {
      console.log(`Server running on port ${port} ✅`);
    });

    }
    
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;