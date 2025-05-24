import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import connectDB from "./db/db.js";

const app = express();

app.use(express.json());
app.use(cors());

await connectDB();

// routes
import videoRouter from "./routes/video.route.js";
import watchedDataRouter from "./routes/watchedData.route.js";

app.use("/api/videos", videoRouter);
app.use("/api/watched-data", watchedDataRouter);

export default app;
