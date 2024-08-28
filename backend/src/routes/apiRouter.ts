import { Router, Response, Request } from "express";

import { ApiController } from "../controllers";
import { uploadValidator } from "../validators";

const apiRouter = Router();
const apiController = new ApiController();

apiRouter.post("/upload", uploadValidator(), apiController.upload);

export default apiRouter;
