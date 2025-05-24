import { Router } from "express";
import {
  getWatchedData,
  postWatchedData,
  updateData,
} from "../controllers/watchedData.controller.js";

const router = Router();

router.post("/", postWatchedData);

router.get("/:videoId", getWatchedData);

router.put("/", updateData);

export default router;
