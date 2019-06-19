import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

class UserController {
  public static listAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "username", "role"],
    });

    res.send(users);
  }

  public static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"],
      });
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    res.status(200).send(user);
  }

  public static create = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    const user = new User(username, role);
    user.setPassword(password);

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("username already in use");
      return;
    }

    res.status(201).send("User created");
  }

  public static edit = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { username, role } = req.body;

    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send("Username already in use");
      return;
    }
    res.status(204).send();
  }

  public static remove = async (req: Request, res: Response) => {
    const id = req.params.id;

    const userRepository = getRepository(User);
    try {
      await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }
    userRepository.delete(id);
    res.status(204).send();
  }
}

export default UserController;
