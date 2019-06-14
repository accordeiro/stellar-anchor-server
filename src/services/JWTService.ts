import * as jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { User } from "../entity/User";
import settings from "../settings/settings";

export interface JWTPayload {
  userId: number;
  username: string;
}
interface JWTResponseFormat {
  token: string;
}

export class JWTService {
  public static signJWT = (
    user: User,
    expiresIn: string = settings.DEFAULT_JWT_DURATION,
  ): JWTResponseFormat => {
    const jwtP: JWTPayload = {
      userId: user.id,
      username: user.username,
    };

    const signOptions: SignOptions = { expiresIn };

    return {
      token: jwt.sign(jwtP, settings.JWT_SECRET, signOptions),
    };
  }

  public static verifyJWT = (token: string): JWTPayload => {
    return jwt.verify(token, settings.JWT_SECRET) as JWTPayload;
  }
}
