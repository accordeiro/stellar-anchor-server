import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { JWTService } from "../services/JWTService";

class AuthController {
  public static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
      return;
    }

    if (!user.isPasswordValid(password)) {
      res.status(401).send();
      return;
    }

    res.send(JWTService.signJWT(user));
  }

  public static changePassword = async (req: Request, res: Response) => {
    const user = res.locals.user as User;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
      return;
    }

    if (!user.isPasswordValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    user.setPassword(newPassword);
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const userRepository = getRepository(User);
    userRepository.save(user);

    res.status(204).send();
  }
}
export default AuthController;
