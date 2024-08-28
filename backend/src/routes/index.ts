import { Router } from "express";
import apiRouter from "./apiRouter";

const router = Router();

router.use(apiRouter);

export default router;