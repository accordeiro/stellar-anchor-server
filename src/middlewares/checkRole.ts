import { NextFunction, Request, Response } from "express";
import { Role } from "../entity/User";

export const checkRole = (roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    // Check if user has one of the required roles:
    if (roles.indexOf(user.role) > -1) {
      next();
    } else {
      res.status(403).send();
    }
  };
};
