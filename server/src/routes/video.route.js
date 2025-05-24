import { Router } from "express";
import { getVideo, postVideo } from "../controllers/video.controller.js";

const router = Router();

router.post("/", postVideo);
router.get("/:id", getVideo);

export default router;
