import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { JWTPayload, JWTService } from "../services/JWTService";

const parseJWT = (authHeader: string = ""): string => {
  const words = authHeader.split(" ");
  if (words.length != 2 || words[0] != "Bearer") {
    return "";
  }

  return words[1];
};

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const currToken = parseJWT(req.headers.authorization as string);
  let jwtPayload: JWTPayload;
  try {
    jwtPayload = JWTService.verifyJWT(currToken);
  } catch (error) {
    res.status(401).send();
    return;
  }

  const { userId } = jwtPayload;
  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail(userId);
  } catch (userId) {
    res.status(401).send();
    return;
  }

  // Store the user on `res.locals.user`, so controllers after this middleware
  // have direct access to the User instance:
  res.locals.user = user;

  const { token } = JWTService.signJWT(user);
  res.setHeader("token", token);

  next();
};
