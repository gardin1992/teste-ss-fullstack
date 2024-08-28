import { Router, Response, Request } from "express";

import { ApiController } from "../controllers";
import { confirmValidtor, uploadValidator } from "../validators";

const apiRouter = Router();
const apiController = new ApiController();

apiRouter.post("/upload", uploadValidator(), apiController.upload);
apiRouter.patch("/confirm", confirmValidtor(), apiController.confirm);
apiRouter.get("/:customer_code/list", apiController.customerCodeList);

export default apiRouter;
