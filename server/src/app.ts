import express, { Application } from "express";
import morgan from "morgan"
import "dotenv/config";
import cors from 'cors';
import { controllers } from "./controllers";

const app: Application = express();

const requestHeaders = (
  _: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data
app.use(morgan('dev'));

const toUse = [cors({ origin: '*' }), requestHeaders];
toUse.forEach((object) => app.use(object));
app.use("/", controllers);

export default app;
