import {
  healthHandler,
  addToCartHandler,
  deleteCartHandler,
  getCartHandler,
  removeFromCartHandler,
} from "../handlers";

const express = require("express");
const router = express.Router();

router.get("/health", healthHandler);
router.get("/:userId/", getCartHandler);
router.post("/add/:userId/:coffeeId", addToCartHandler);
router.delete("/remove/:userId/:coffeeId", removeFromCartHandler);
router.delete("/:userId/", deleteCartHandler);

export default router;
