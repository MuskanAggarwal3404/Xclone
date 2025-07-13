import express from "express"
import { ENV } from "./config/env";
import {connectDB} from "./config/db.js";

const app=express();

// Add essential middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello"));

// Start server with proper async/await handling
const startServer = async () => {
  try {
    await connectDB();
    const port = ENV.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port} ✅`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();