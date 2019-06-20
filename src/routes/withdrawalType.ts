import { Router } from "express";
import WithdrawalTypeController from "../controllers/WithdrawalTypeController";
import { Role } from "../entity/User";
import { checkRole } from "../middlewares/checkRole";
import { checkUser } from "../middlewares/checkUser";

const router = Router();

router.get(
  "/",
  [checkUser, checkRole([Role.Admin])],
  WithdrawalTypeController.listAll,
);

router.get(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  WithdrawalTypeController.getOneById,
);

router.post(
  "/",
  [checkUser, checkRole([Role.Admin])],
  WithdrawalTypeController.create,
);

router.patch(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  WithdrawalTypeController.edit,
);

router.delete(
  "/:id([0-9]+)",
  [checkUser, checkRole([Role.Admin])],
  WithdrawalTypeController.remove,
);

export default router;
