import mongoose from "mongoose";
import { CartItem } from "../common/cart.dto";
import Cart from "../models/cart.model";
import { getId } from "../utils";

export const getCart = async (userId: string): Promise<any> => {
  const data = await Cart.aggregate([
    {
      $match: { userId },
    },
  ]).exec();

  return data;
};

export const addToCart = async (
  userId: string,
  coffeeId: string
): Promise<any> => {
  let item = await Cart.findById(getId(userId, coffeeId)).exec();
  if (!!item) {
    await Cart.findByIdAndUpdate(getId(userId, coffeeId), {
      quantity: item.quantity + 1,
    }).exec();
  } else {
    const newItem = new Cart({
      _id: getId(userId, coffeeId),
      quantity: 1,
      userId,
      coffeeId,
    });

    await newItem.save();
  }

  return await Cart.findById(getId(userId, coffeeId)).exec();
};

export const removeFromCart = async (
  userId: string,
  coffeeId: string
): Promise<any> => {
  let item = await Cart.findById(getId(userId, coffeeId)).exec();
  if (!!item) {
    if (item.quantity > 1) {
      await Cart.findByIdAndUpdate(getId(userId, coffeeId), {
        quantity: item.quantity - 1,
      }).exec();
    } else {
      await Cart.findByIdAndDelete(getId(userId, coffeeId));
    }
  }

  return await Cart.findById(getId(userId, coffeeId)).exec();
};

export const deleteCart = async (userId: string): Promise<any> => {
  return await Cart.deleteMany({
    userId,
  });
};
