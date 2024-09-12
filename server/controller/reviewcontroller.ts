import type { Context } from "hono";
import { db } from "../drizzle/db";
import { errorResponse, successResponse } from "../lib/res";
import { StatusCodes } from "http-status-codes";
import type { createReviewType, editReviewType } from "../types/reviewTypes";
import { review } from "../model";
import { eq } from "drizzle-orm";

export async function createReview(c: Context, body: createReviewType) {
  const { user_id, product_id, rating, reviews } = body;
  try {
    const [reviewCreation] = await db
      .insert(review)
      .values({
        user_id: user_id as string,
        product_id,
        rating,
        review: reviews,
      })
      .returning()
      .execute();
    if (!reviewCreation) {
      c.status(StatusCodes.BAD_REQUEST);
      c.json(errorResponse("Failed to create review", StatusCodes.BAD_REQUEST));
    }
    c.status(StatusCodes.CREATED);
    return c.json(
      successResponse(
        "Successfully added review",
        { reviewCreation },
        StatusCodes.CREATED
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
export async function editReview(c: Context, body: editReviewType) {
  const { user_id, product_id, rating, reviews, review_id } = body;
  try {
    //find the review
    const [review_check] = await db
      .select()
      .from(review)
      .where(eq(review.review_id, review_id as string))
      .execute();
    if (!review_check) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(
        errorResponse("Requested review not found", StatusCodes.NOT_FOUND)
      );
    }
    const updatedReviewData: Partial<editReviewType> = {};

    if (rating !== undefined) {
      updatedReviewData.rating = rating;
    }
    if (reviews !== undefined) {
      updatedReviewData.reviews = reviews;
    }
    updatedReviewData.user_id = user_id;
    updatedReviewData.product_id = product_id;

    //update review here
    const [updatedReview] = await db
      .update(review)
      .set(updatedReviewData)
      .where(eq(review.review_id, review_check.review_id))
      .returning();
    if (!updatedReview) {
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(
        errorResponse("Failed to create review", StatusCodes.BAD_REQUEST)
      );
    }
    //return response
    c.status(StatusCodes.OK);
    return c.json(
      successResponse(
        "Successfully updated review",
        { updatedReview },
        StatusCodes.OK
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
export async function deleteReview(c: Context, review_id: string) {
  try {
    const [review_check] = await db
      .select()
      .from(review)
      .where(eq(review.review_id, review_id as string))
      .execute();
    if (!review_check) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(
        errorResponse("Requested review not found", StatusCodes.NOT_FOUND)
      );
    }
    const [deletedReview] = await db
      .delete(review)
      .where(eq(review.review_id, review_id))
      .returning()
      .execute();
    if (!deletedReview) {
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(
        errorResponse("Failed to delete review", StatusCodes.BAD_REQUEST)
      );
    }
    c.status(StatusCodes.ACCEPTED);
    return c.json(
      successResponse(
        "Successfully removed review",
        { deleteReview },
        StatusCodes.BAD_REQUEST
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
