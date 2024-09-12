import type { Context } from "hono";
import { db } from "../drizzle/db";
import { errorResponse, successResponse } from "../lib/res";
import { StatusCodes } from "http-status-codes";
import type {
  createProductType,
  editProductType,
  editStocksType,
  searchProductType,
} from "../types/productTypes";
import { product } from "../model";
import { eq, ilike, or } from "drizzle-orm";

export async function createProduct(c: Context, body: createProductType) {
  const {
    seller_id,
    product_name,
    product_description,
    product_price,
    product_stock,
    image_url,
    category_id,
  } = body;
  try {
    //creating new product
    const [newProduct] = await db
      .insert(product)
      .values({
        seller_id,
        product_name,
        product_description,
        product_price: product_price,
        product_stock,
        image_url,
        category_id,
      })
      .returning()
      .execute();
    if (!newProduct) {
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(
        errorResponse("Failed to create new product", StatusCodes.BAD_REQUEST)
      );
    }
    c.status(StatusCodes.CREATED);
    return c.json(
      successResponse(
        "Product created successfully",
        { newProduct },
        StatusCodes.CREATED
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
export async function editStocks(c: Context, body: editStocksType) {
  const { product_id, product_stock } = body;
  try {
    //check if product exists or not
    const [productCheck] = await db
      .select()
      .from(product)
      .where(eq(product.product_id, product_id as string))
      .execute();
    if (!productCheck) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(errorResponse("Product not found", StatusCodes.NOT_FOUND));
    }
    //if product is found then edit the stocks
    const [addedStocksProduct] = await db
      .update(product)
      .set({ product_stock: productCheck.product_stock + product_stock })
      .returning()
      .execute();
    if (!addedStocksProduct) {
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(
        errorResponse("Failed to add stocks", StatusCodes.BAD_REQUEST)
      );
    }
    //return the response
    c.status(StatusCodes.OK);
    return c.json(
      successResponse(
        "Successfully added stocks",
        { addedStocksProduct },
        StatusCodes.OK
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export async function searchProduct(c: Context, body: searchProductType) {
  const { searchText, page, pageSize } = body;
  try {
    const products = await db
      .select()
      .from(product)
      .where(
        or(
          ilike(product.product_name, `%${searchText}%`),
          ilike(product.product_description, `%${searchText}%`)
        )
      )
      .limit(pageSize as number)
      .offset((page as number) * (pageSize as number))
      .execute();
    if (!products) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(errorResponse("Product not found", StatusCodes.NOT_FOUND));
    }
    c.status(StatusCodes.OK);
    return c.json(
      successResponse(
        `Total ${products.length} results of ${searchText} are found`,
        { products },
        StatusCodes.OK
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
export async function editProduct(c: Context, body: editProductType) {
  const {
    seller_id,
    product_name,
    product_description,
    product_price,
    product_stock,
    image_url,
    category_id,
    product_id,
  } = body;
  try {
    //check if the product is already exists or not
    const [productCheck] = await db
      .select()
      .from(product)
      .where(eq(product.product_id, product_id as string))
      .execute();
    if (!productCheck) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(errorResponse("Product not found", StatusCodes.NOT_FOUND));
    }
    //if product is found then create temporary object where we can insert it later.
    const updateProductObject: Partial<editProductType> = {};
    if (seller_id as string) updateProductObject.seller_id = seller_id;
    if (product_name as string) updateProductObject.product_name = product_name;
    if (product_description as string)
      updateProductObject.product_description = product_description;
    if (typeof product_price === "number")
      updateProductObject.product_price = product_price;
    if (typeof product_stock === "number")
      updateProductObject.product_stock = product_stock;
    if (image_url as string) updateProductObject.image_url = image_url;
    if (category_id as string) updateProductObject.category_id = category_id;

    if (Object.keys(updateProductObject).length === 0) {
      return c.json(
        errorResponse("No fields provided for update", StatusCodes.BAD_REQUEST)
      );
    }

    //update the product
    const [updatedProduct] = await db
      .update(product)
      .set(updateProductObject)
      .where(eq(product.product_id, product_id as string))
      .returning()
      .execute();
    if (!updatedProduct) {
      c.status(StatusCodes.BAD_REQUEST);
      c.json(
        errorResponse("Failed to update product", StatusCodes.BAD_REQUEST)
      );
    }
    //return the product
    c.status(StatusCodes.OK);
    return c.json(
      successResponse(
        "Successfully updated product",
        { updatedProduct },
        StatusCodes.OK
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export async function productReview(c: Context, product_id: string) {
  try {
    //check if product is avaialbe or not
    const [product_check] = await db
      .select()
      .from(product)
      .where(eq(product.product_id, product_id))
      .execute();
    if (!product_check) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(
        errorResponse("Requested Product does not exist", StatusCodes.NOT_FOUND)
      );
    }
    //fetch the details of product
    const [reviewOfProducts] = await db.query.review.findMany({
      columns: {
        review: true,
        rating: true,
      },
      with: {
        user: true,
      },
      where: eq(product.product_id, product_id),
    });
    if (!reviewOfProducts) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(
        errorResponse(
          "Review of given product not found",
          StatusCodes.NOT_FOUND
        )
      );
    }
    c.status(StatusCodes.OK);
    return c.json(
      successResponse(
        "Successfully got the reviews",
        { reviewOfProducts },
        StatusCodes.OK
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}

export async function removeProduct(c: Context, product_id: string) {
  try {
    //check for product
    const [product_check] = await db
      .select()
      .from(product)
      .where(eq(product.product_id, product_id))
      .execute();
    if (!product_check) {
      c.status(StatusCodes.NOT_FOUND);
      return c.json(
        errorResponse("Requested Product does not exist", StatusCodes.NOT_FOUND)
      );
    }
    //remove product from database
    const [product_removal] = await db
      .delete(product)
      .where(eq(product.product_id, product_id))
      .returning()
      .execute();
    if (!product_removal) {
      c.status(StatusCodes.BAD_REQUEST);
      return c.json(
        errorResponse("Failed to remove product", StatusCodes.BAD_REQUEST)
      );
    }
    //return the response
    c.status(StatusCodes.ACCEPTED);
    return c.json(
      successResponse(
        "Successfully removed the product",
        { product_removal },
        StatusCodes.ACCEPTED
      )
    );
  } catch (error) {
    c.status(StatusCodes.INTERNAL_SERVER_ERROR);
    return c.json(errorResponse(error, StatusCodes.INTERNAL_SERVER_ERROR));
  }
}
