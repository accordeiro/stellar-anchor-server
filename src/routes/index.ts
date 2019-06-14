import { Router } from "express";
import auth from "./auth";
import user from "./user";

const apiPath = "/api/v1";
const routes = Router();

routes.use(`${apiPath}/auth`, auth);
routes.use(`${apiPath}/users`, user);

export default routes;
