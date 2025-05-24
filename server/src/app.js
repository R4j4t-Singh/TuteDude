import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./db/db.js";

const app = express();

app.use(express.json());
app.use(cors());

await connectDB();

export default app;
