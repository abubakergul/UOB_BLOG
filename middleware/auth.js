import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

UnauthenticatedError;
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    console.log(process.env.JWT_SECRET);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = payload;
    req.user = { userId, name };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Authentication Invaliddddd");
  }
};

export default auth;
