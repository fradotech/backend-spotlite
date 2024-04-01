import express from "express";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../config";
import { User } from "../../src/entities/user.entity";

type Request = express.Request & { user: User };

const authMiddleware: express.RequestHandler = (req, res, next) => {
  const request: Request = req as Request;

  if (
    [
      `${CONFIG.prefix}/users/register`,
      `${CONFIG.prefix}/users/login`,
    ].includes(request.path)
  ) {
    return next();
  }
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: "Token malformatted" });
  }

  jwt.verify(token, CONFIG.auth.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalid" });
    }

    request.user = decoded as User;

    return next();
  });
};

export default authMiddleware;
