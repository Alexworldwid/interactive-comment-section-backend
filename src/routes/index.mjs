import { Router } from "express";
import commentRoute from "./comments.mjs";
import replyRoute from "./replies.mjs"


const router = Router();
router.use(commentRoute);
router.use(replyRoute);


export default router