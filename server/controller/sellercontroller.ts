import type { Context } from "hono";
import type { sellerInsert, sellerstatusChange } from "../types/sellerTypes";
import { db } from "../drizzle/db";
import { CustomError, errorResponse, successResponse } from "../lib/res";
import { StatusCodes } from "http-status-codes";
import { seller, user } from "../model";
import { eq, ilike, or, sql } from "drizzle-orm";
export async function signupSellerAccount(c: Context, body: sellerInsert) {
  const { user_id, store_name, store_description } = body;

  try {
    const newSellerTransaction = await db.transaction(async (tx) => {
      // Check if seller already exists
      const [existingSeller] = await tx
        .select({ user_id: seller.user_id, store_name: seller.store_name })
        .from(seller)
        .where(eq(seller.user_id, user_id))
        .limit(1)
        .execute();

      if (existingSeller) {
        throw new Error("Seller already exists");
      }

      // Check if store name already exists
      const [existingStoreName] = await tx
        .select({ store_name: seller.store_name })
        .from(seller)
        .where(eq(seller.store_name, store_name))
        .limit(1)
        .execute();

      if (existingStoreName) {
        throw new CustomError(
          "Store name already exists",
          StatusCodes.CONFLICT
        );
      }

      // Create new seller
      const [newSeller] = await tx
        .insert(seller)
        .values({
          user_id: user_id,
          store_name: store_name,
          store_description: store_description,
          status: "inactive",
        })
        .returning();

      // Update user type
      await tx
        .update(user)
        .set({ user_type: "seller" })
        .where(eq(user.user_id, user_id))
        .execute();

      if (!newSeller) {
        throw new CustomError(
          "Failed to create new seller account",
          StatusCodes.BAD_REQUEST
        );
      }

      // Return result as object
      return { newSeller };
    });

    // Return success response
    return c.json(
      successResponse(
        "Successfully created seller account",
        { newSeller: newSellerTransaction.newSeller },
        StatusCodes.CREATED
      )
    );
  } catch (error: any) {
    // Return error response
    return c.json(
      errorResponse(
        error.message || "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
}

export async function changeStoreStatusToActive(
  c: Context,
  body: sellerstatusChange
) {
  const { user_id } = body;
  try {
    //check for already active state
    const [activeuser] = await db
      .select()
      .from(seller)
      .where(eq(seller.user_id, user_id))
      .execute();
    if (activeuser.status === "active") {
      return c.json(
        errorResponse("Seller is already active", StatusCodes.BAD_REQUEST)
      );
    }
    //update the status
    const [updatedStatus] = await db
      .update(seller)
      .set({ status: "active" })
      .where(eq(seller.user_id, user_id))
      .returning()
      .execute();
    if (!updatedStatus) {
      return c.json("Failed to update status", StatusCodes.BAD_REQUEST);
    }
    return c.json(
      successResponse(
        "Successfully changed status",
        { updatedStatus },
        StatusCodes.OK
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
export async function changeStoreStatusToInActive(
  c: Context,
  body: sellerstatusChange
) {
  try {
    const { user_id } = body;
    const [inactiveuser] = await db
      .select()
      .from(seller)
      .where(eq(seller.user_id, user_id))
      .execute();
    if (inactiveuser.status === "inactive") {
      return c.json(
        errorResponse("Seller is already inactive", StatusCodes.BAD_REQUEST)
      );
    }
    const [updatedStatus] = await db
      .update(seller)
      .set({ status: "inactive" })
      .where(eq(seller.user_id, user_id))
      .returning()
      .execute();
    if (!updatedStatus) {
      return c.json("Failed to update status", StatusCodes.BAD_REQUEST);
    }
    return c.json(
      successResponse(
        "Successfully changed status",
        { updatedStatus },
        StatusCodes.OK
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export async function searchSeller(c: Context, searchText: string) {
  try {
    const sellers = await db
      .select()
      .from(seller)
      .where(
        or(
          ilike(seller.store_name, `${searchText}%`),
          ilike(seller.store_description, `${searchText}%`)
        )
      )
      .execute();
    return c.json(
      successResponse(`${searchText} results`, { sellers }, StatusCodes.OK)
    );
  } catch (error) {
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
