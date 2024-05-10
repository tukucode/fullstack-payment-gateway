import express, { urlencoded, json } from "express";
import cors from "cors";

// pool connection
import "./src/config/connection.js";

import routeTransaction from "./src/routes/transaction.js";

const app = express();

app.use(cors());

app.use(json({ limit: "1mb" }));
app.use(urlencoded({ limit: "1mb", extended: true }));

app.use("/api/v1", routeTransaction);

app.all("*", (req, res) => {
  res.send({
    code: 404,
    message: "Not found",
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
