import { deleteCart } from ".";
import { OrderItem } from "../common/order.dto";
import { RedisService } from "./redis";

export const listenToOrders = () => {
  console.log("Listening to Redis Messages...");
  RedisService.getClient().on("message", (channel, message) => {
    if (channel === "order") {
      const order: OrderItem = JSON.parse(message);
      console.log("ORDER :: ", order);
      //  Cleaning Up the cart
      deleteCart(order.userId)
        .then(() => {
          console.log(`${order.userId} cart has been cleared`);
        })
        .catch((err) => {
          console.error(`Error clearing ${order.userId} cart :: `, err.message);
        });
    }
  });
};
