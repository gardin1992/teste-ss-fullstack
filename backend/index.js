const express = require("express");

const PORT = 3005;
const HOST = "0.0.0.0";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! -_-");
});

app.listen(PORT, HOST);
