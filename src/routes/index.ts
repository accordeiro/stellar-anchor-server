import { Router } from "express";
import auth from "./auth";
import infoField from "./infoField";
import user from "./user";

const apiPath = "/api/v1";
const routes = Router();

routes.use(`${apiPath}/auth`, auth);
routes.use(`${apiPath}/users`, user);
routes.use(`${apiPath}/info_field`, infoField);

export default routes;
