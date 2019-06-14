import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkUser } from "../middlewares/checkUser";

const router = Router();

router.post("/login", AuthController.login);
router.post("/change-password", [checkUser], AuthController.changePassword);

export default router;
