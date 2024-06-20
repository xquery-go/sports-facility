import { Response, NextFunction } from "express";
import { validateToken } from "../lib/token";
import { JwtPayload } from "jsonwebtoken";
import AuthenticatedRequest from "../types/type";

const userAuthenticationMiddleWare = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Collect the authToken from request
  const authToken = req.headers.authorization?.split(" ")[1] as string;

  // Checking auth token has or not
  if (!authToken) {
    throw new Error("Invalid data");
  }

  //  call authToken validation service for validate the token
  const decodedData = (await validateToken(authToken)) as JwtPayload;

  if (decodedData) {
    req.user = decodedData as JwtPayload;
    next();
  }
};

export default userAuthenticationMiddleWare;