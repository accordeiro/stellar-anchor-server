import { Router } from "express";
import UserController from "../controllers/UserController";
import { Role } from "../entity/User";
import { checkRole } from "../middlewares/checkRole";
import { checkUser } from "../middlewares/checkUser";

const router = Router();

router.get("/", [checkUser, checkRole([Role.Admin])], UserController.listAll);

router.get(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  UserController.getOneById,
);

router.post("/", [checkUser, checkRole([Role.Admin])], UserController.create);

router.patch(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  UserController.edit,
);

router.delete(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  UserController.remove,
);

export default router;
