# coffee-cart-svc

A simple Coffee Service

Create a `config.json` file inside `src/configs` to start

```js
interface Config {
  port: number;
  mongodb: {
    uri: string,
  };
  redis: {
    host: string;
    port: number;
  };
}
```
