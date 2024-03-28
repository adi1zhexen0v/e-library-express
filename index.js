import express from "express";
import mongoose from "mongoose";
import setupRoutes from "./routes/routes.js";

const app = express();
const PORT = 3000;
const dbUrl =
  "mongodb+srv://mongouser:0fo9E6UTTr9csbJR@cluster0.sgal5gg.mongodb.net/e-library";

async function start() {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to MongoDB");

    setupRoutes(app);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

start();
