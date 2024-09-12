import type { Context } from "hono";
import type {
  editCategoryType,
  insertCategoryType,
} from "../types/categoryTypes";
import { CustomError, errorResponse, successResponse } from "../lib/res";
import { StatusCodes } from "http-status-codes";
import { db } from "../drizzle/db";
import { category } from "../model";
import { eq } from "drizzle-orm";

export async function createCategory(c: Context, body: insertCategoryType) {
  const { category_name, category_description } = body;
  try {
    //category name check
    const [category_name_check] = await db
      .select()
      .from(category)
      .where(eq(category.category_name, category_name))
      .execute();
    if (category_name_check) {
      c.status(StatusCodes.CONFLICT);
      return c.json(
        errorResponse("category already exists", StatusCodes.CONFLICT)
      );
    }
    //create new category
    const [newCategory] = await db
      .insert(category)
      .values({
        category_name: category_name,
        category_description: category_description,
      })
      .returning()
      .execute();
    if (!newCategory) {
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(
        errorResponse("Failed to create category", StatusCodes.BAD_REQUEST)
      );
    }
    c.status(StatusCodes.CREATED);
    return c.json(
      successResponse(
        "Successfully created category",
        { newCategory },
        StatusCodes.CREATED
      )
    );
  } catch (error) {
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
export async function editCategory(c: Context, body: editCategoryType) {
  const { category_name, category_description, category_id } = body;
  try {
    //category name check
    const [category_name_check] = await db
      .select()
      .from(category)
      .where(eq(category.category_id, category_id as string))
      .execute();
    if (!category_name_check) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(
        errorResponse("category does not exists", StatusCodes.NOT_FOUND)
      );
    }
    //partials
    const updateData: Partial<editCategoryType> = {};
    if (category_name) updateData.category_name = category_name as string;
    if (category_description)
      updateData.category_description = category_description as string;

    if (Object.keys(updateData).length === 0) {
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(
        errorResponse("No fields to update", StatusCodes.BAD_REQUEST)
      );
    }
    //edit details of category
    const [updatedCategory] = await db
      .update(category)
      .set(updateData)
      .where(eq(category.category_id, category_name_check.category_id))
      .returning()
      .execute();
    if (!updatedCategory) {
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(
        errorResponse("Failed to create category", StatusCodes.BAD_REQUEST)
      );
    }
    c.status(StatusCodes.ACCEPTED);
    return c.json(
      successResponse(
        "Successfully updated category",
        { updatedCategory },
        StatusCodes.ACCEPTED
      )
    );
  } catch (error) {
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
