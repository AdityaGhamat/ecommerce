import type { Context } from "hono";
import type {
  loginUser,
  updateEmailType,
  updatePasswordType,
  updateUsernameType,
  userInsert,
} from "../types/userTypes";
import { successResponse, errorResponse, CustomError } from "../lib/res";
import { db } from "../drizzle/db";
import { cart, user } from "../model";
import { eq } from "drizzle-orm";
import { hash, verify } from "argon2";
import { StatusCodes } from "http-status-codes";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
import { cookieOptions } from "../lib/constant/constant";

export async function createuser(c: Context, body: userInsert) {
  const { username, email, password } = body;
  try {
    // start the transaction
    const result = await db.transaction(async (tx) => {
      // check if the email already exists
      const [existingEmail] = await tx
        .select({ email: user.email })
        .from(user)
        .where(eq(user.email, email))
        .execute();

      if (existingEmail) {
        // if email exists then return early from the transaction
        throw new Error("Email already exists");
      }

      // encrypt the password
      const encryptedPass = await hash(password);

      // create new user
      const [newUser] = await tx
        .insert(user)
        .values({ username: username, email: email, password: encryptedPass })
        .returning();

      // create a cart for the new user
      const [newCart] = await tx
        .insert(cart)
        .values({ user_id: newUser.user_id })
        .returning();

      //  jwt token
      const token = await sign(
        { id: newUser.user_id },
        process.env.JWT_SECRET as string
      );

      // return necessary data
      return { newUser, newCart, token };
    });
    setCookie(c, "Authorization", result.token, cookieOptions);
    return c.json({
      success: true,
      data: { newUser: result.newUser, newCart: result.newCart },
      error: {},
    });
  } catch (error: any) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(
      errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

export async function loginuser(c: Context, body: loginUser) {
  const { email, password } = body;
  try {
    const [existingEmail] = await db
      .select({ email: user.email, id: user.user_id, password: user.password })
      .from(user)
      .where(eq(user.email, email))
      .execute();

    if (!existingEmail) {
      return c.json(errorResponse(`Email not found`, StatusCodes.NOT_FOUND));
    }

    // Verifying password
    const passwordCheck = await verify(existingEmail.password, password);
    if (!passwordCheck) {
      return c.json(
        errorResponse(`Invalid password`, StatusCodes.UNAUTHORIZED)
      );
    }

    // Creating jwt token
    const token = await sign(
      { id: existingEmail.id },
      process.env.JWT_SECRET as string
    );

    // Setting cookie
    setCookie(c, "Authorization", token, cookieOptions);

    // Returning response
    return c.json(
      successResponse("Login successfull", { token }, StatusCodes.ACCEPTED)
    );
  } catch (error: any) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(
      errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

export async function updateEmail(c: Context, body: updateEmailType) {
  const { email, user_id } = body;
  try {
    //check if email already exists
    const [emailCheck] = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.email, email))
      .limit(1)
      .execute();
    if (emailCheck) {
      return c.json(
        errorResponse("Email already in use", StatusCodes.CONFLICT)
      );
    }
    //update email
    const [updatedEmail] = await db
      .update(user)
      .set({ email: email })
      .where(eq(user.user_id, user_id as string))
      .returning();
    if (!updatedEmail) {
      return c.json(
        errorResponse("Failed to update email", StatusCodes.BAD_REQUEST)
      );
    }
    return c.json(
      successResponse(
        "Email updated successfully",
        { updatedEmail },
        StatusCodes.OK
      )
    );
  } catch (error: any) {
    if (error instanceof CustomError) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(errorResponse(error.message, error.status));
    }
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(
      errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

export async function updatePassword(c: Context, body: updatePasswordType) {
  const { password, user_id, old_password } = body;
  try {
    //check if user already exists
    const [userCheck] = await db
      .select()
      .from(user)
      .where(eq(user.user_id, user_id as string))
      .limit(1)
      .execute();
    if (!userCheck) {
      return c.json(errorResponse("User not found", StatusCodes.NOT_FOUND));
    }
    //checking if the old password is same as new password
    if (old_password === password) {
      c.status(StatusCodes.CONFLICT);
      return c.json(
        errorResponse(
          "New password cannot be the old password",
          StatusCodes.CONFLICT
        )
      );
    }
    //chekcing old password is correct or not
    const old_password_check = await verify(old_password, userCheck.password);
    if (!old_password_check) {
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(
        errorResponse("Old password is incorrect", StatusCodes.BAD_REQUEST)
      );
    }

    //encrypt password
    const encryptedPass = await hash(password);
    //update password
    const [updatedUser] = await db
      .update(user)
      .set({ password: encryptedPass })
      .where(eq(user.user_id, user_id as string))
      .returning();
    if (!updatedUser) {
      return c.json(
        errorResponse("Failed to update password", StatusCodes.BAD_REQUEST)
      );
    }
    return c.json(
      successResponse(
        "Successfully updated password",
        { updatedUser },
        StatusCodes.OK
      )
    );
  } catch (error: any) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(
      errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}

export async function updateUsername(c: Context, body: updateUsernameType) {
  const { username, user_id } = body;
  try {
    //find user
    const [userCheck] = await db
      .select({ user_id: user.user_id })
      .from(user)
      .where(eq(user.user_id, user_id as string))
      .limit(1)
      .execute();
    if (!userCheck) {
      return c.json(errorResponse("User not found", StatusCodes.NOT_FOUND));
    }
    //updated username
    const [updatedUser] = await db
      .update(user)
      .set({ username: username })
      .where(eq(user.user_id, user_id as string))
      .returning();
    if (!updatedUser) {
      return c.json(
        errorResponse("Failed to update username", StatusCodes.BAD_REQUEST)
      );
    }
    return c.json(
      successResponse(
        "Succesfully updated username",
        { updatedUser },
        StatusCodes.OK
      )
    );
  } catch (error: any) {
    if (error instanceof CustomError) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(errorResponse(error.message, error.status));
    }
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(
      errorResponse(error.message, StatusCodes.INTERNAL_SERVER_ERROR)
    );
  }
}
