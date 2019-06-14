import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import "reflect-metadata";
import routes from "./routes";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Point to index router
app.use("/", routes);

export default app;
