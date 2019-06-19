import { Router } from "express";
import AssetController from "../controllers/AssetController";
import { Role } from "../entity/User";
import { checkRole } from "../middlewares/checkRole";
import { checkUser } from "../middlewares/checkUser";

const router = Router();

router.get("/", [checkUser, checkRole([Role.Admin])], AssetController.listAll);

router.get(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  AssetController.getOneById,
);

router.post("/", [checkUser, checkRole([Role.Admin])], AssetController.create);

router.patch(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  AssetController.edit,
);

router.delete(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  AssetController.remove,
);

export default router;
