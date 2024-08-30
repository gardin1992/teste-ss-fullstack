import express, { Router, Request, Response } from "express";
import router from "./src/routes";
import bodyParser from "body-parser";

const PORT = 3005;
const HOST = "0.0.0.0";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use(router);

app.listen(PORT, HOST, () => {
  console.log('backend started');
});
