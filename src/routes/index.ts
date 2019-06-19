import { Router } from "express";
import assets from "./asset";
import auth from "./auth";
import infoField from "./infoField";
import user from "./user";

const apiPath = "/api/v1";
const routes = Router();

routes.use(`${apiPath}/auth`, auth);
routes.use(`${apiPath}/assets`, assets);
routes.use(`${apiPath}/users`, user);
routes.use(`${apiPath}/info_fields`, infoField);

export default routes;
