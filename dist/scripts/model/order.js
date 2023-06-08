export class Order{
  id = 0;
  userID = 0;
  productID = 0;
  color = '';
  size = 0;
  status = "";
  count = 0;
  title = '';
  price = 0;
  paymentMethod = '';
  shippingAddress = '';

  constructor(order) {
    this.id = order.id;
    this.userID = order.userId;
    this.productID =order.productId;
    this.color = order.color;
    this.size = order.size;
    this.status = order.status;
    this.count = order.count;
    this.title = order.title;
    this.price = order.price;
    this.paymentMethod = order.paymentMethod;
    this.shippingAddress = order.shippingAddress;
  }
}