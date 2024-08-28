import express, { Router, Request, Response } from "express";

const PORT = 3005;
const HOST = "0.0.0.0";

const app = express();
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use(router);

app.listen(PORT, HOST);
