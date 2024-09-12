import { StatusCodes } from "http-status-codes";
import { CustomError } from "../lib/res";
import { serverconfig } from "../config";
import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";

export async function authmiddleware(c: any, next: Function) {
  const token = getCookie(c, "Authorization");

  if (!token) {
    throw new CustomError("Token not found", StatusCodes.NOT_FOUND);
  }

  try {
    const decodedToken = await verify(token, serverconfig.JWT_SECRET as string);
    if (!decodedToken) {
      throw new CustomError("jwt key is wrong", StatusCodes.BAD_REQUEST);
    }
    c.set("user_id", decodedToken.id);
    await next();
  } catch (error) {
    throw new CustomError(`${error}`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
