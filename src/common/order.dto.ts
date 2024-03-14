import { CartItem } from "./cart.dto";

export class OrderItem {
  readonly id?: string;
  readonly userId: string;
  readonly items: CartItem[];

  constructor(data: OrderItem) {
    if (data) {
      this.id = data?.id;
      this.userId = data.userId;
      this.items = data.items;
    }
  }
}
