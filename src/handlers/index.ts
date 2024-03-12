import { HttpStatusCode } from "axios";
import { Request, Response } from "express";
import { ApiResponse } from "../common/api-response.dto";
import { addToCart, getCart, deleteCart, removeFromCart } from "../services";
import configData from "../configs/config";

export const healthHandler = (_: Request, res: Response) => {
  res.status(HttpStatusCode.Ok).json({
    message: `coffee-cart-svc is up and running on port :: ${configData.port}`,
  } as ApiResponse);
};

export const getCartHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await getCart(userId);
    res.status(HttpStatusCode.Ok).json({
      message: `Cart Retrieved :: ${userId}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      success: false,
      error: err,
    } as ApiResponse);
  }
};

export const addToCartHandler = async (req: Request, res: Response) => {
  const { userId, coffeeId } = req.params;
  try {
    const data = await addToCart(userId, coffeeId);
    res.status(HttpStatusCode.Ok).json({
      message: `Added to Cart :: ${userId}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      error: err,
    } as ApiResponse);
  }
};

export const removeFromCartHandler = async (req: Request, res: Response) => {
  try {
    const { userId, coffeeId } = req.params;
    const data = await removeFromCart(userId, coffeeId);
    res.status(HttpStatusCode.Ok).json({
      message: `Removed from Cart :: ${userId}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      error: err,
    } as ApiResponse);
  }
};

export const deleteCartHandler = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const data = await deleteCart(userId);
    res.status(HttpStatusCode.Ok).json({
      message: `Deleted Cart :: ${userId}`,
      data,
    } as ApiResponse);
  } catch (err) {
    res.status(HttpStatusCode.BadRequest).json({
      error: err,
    } as ApiResponse);
  }
};
