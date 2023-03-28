import express from "express";
import cors from "cors";
import runCodeExcerpts from "api/routes/runCodeExcerpts";

const app = express();

app.use(
  cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  })
);

// Prase the client data to use it from req.body.
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// API Routes --> START
app.use("/run", runCodeExcerpts);
// API Routes --> END

export default app;
