import { StatusCodes } from "http-status-codes";
import { serverconfig } from "../config";
import { CustomError } from "../lib/res";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { db } from "../drizzle/db";
import { user } from "../model";
import { eq } from "drizzle-orm";

export async function sellerauthmiddleware(c: any, next: Function) {
  const token = getCookie(c, "Authorization");

  if (!token) {
    throw new CustomError("Token not found", StatusCodes.NOT_FOUND);
  }
  try {
    const decodedToken = await verify(token, serverconfig.JWT_SECRET as string);
    if (!decodedToken) {
      throw new CustomError("jwt key is wrong", StatusCodes.BAD_REQUEST);
    }
    const [userProfile] = await db
      .select()
      .from(user)
      .where(eq(user.user_id, decodedToken.id as string));

    if (!userProfile) {
      throw new CustomError("User not found", StatusCodes.NOT_FOUND);
    }
    if (userProfile.user_type !== "seller") {
      throw new CustomError(
        "User is not authorized as a seller",
        StatusCodes.FORBIDDEN
      );
    }

    // Call the next middleware in the chain
    await next();
  } catch (error) {
    throw new CustomError(`${error}`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
