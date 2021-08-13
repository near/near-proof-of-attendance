import express, { Application } from "express";
import morgan from "morgan"
import "dotenv/config";
import { controllers } from "./controllers";

const app: Application = express();

app.use(morgan('dev'))

app.use("/", controllers);

export default app;
