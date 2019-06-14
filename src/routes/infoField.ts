import { Router } from "express";
import InfoFieldController from "../controllers/InfoFieldController";
import { Role } from "../entity/User";
import { checkRole } from "../middlewares/checkRole";
import { checkUser } from "../middlewares/checkUser";

const router = Router();

router.get(
  "/",
  [checkUser, checkRole([Role.Admin])],
  InfoFieldController.listAll,
);

router.get(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  InfoFieldController.getOneById,
);

router.post(
  "/",
  [checkUser, checkRole([Role.Admin])],
  InfoFieldController.newInfoField,
);

router.patch(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  InfoFieldController.editInfoField,
);

router.delete(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  InfoFieldController.deleteInfoField,
);

export default router;
