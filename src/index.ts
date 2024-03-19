import express from "express";
import configData from "./configs/config";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import { connectToMongoDB } from "./configs/db";
import { RedisService } from "./services/redis";
import { OrderItem } from "./common/order.dto";
import { listenToOrders } from "./services/order-listener";

// Connecting to MongoDB
connectToMongoDB()
  .then(() => {
    console.log("MongoDB Connected and Initiallized");
    RedisService.getClient()
      .subscribe("order", (err, count) => {
        if (err) {
          console.error("Error subscribing to order channel:", err);
          return;
        }
        console.log(`Subscribed to order channel. Count: ${count}`);
      })
      .then(() => {
        const app = express();
        app.use(express.json());
        app.use(
          bodyParser.urlencoded({
            extended: true,
          })
        );
        app.use(bodyParser.json());
        app.use(cors());
        app.use((req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
          next();
        });
        app.use(router);
        app.listen(configData.port, () => {
          listenToOrders();
          console.log(`coffee-cart-svc started on port :: ${configData.port}`);
        });
      });
  })
  .catch((err) => {
    console.error("Error Initializing DB", err);
  });
