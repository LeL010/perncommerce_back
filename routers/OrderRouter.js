class OrdersRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    const router = this.express.Router();

    router.get(
      "/:email",
      this.checkJwt,
      this.controller.getAllOrders.bind(this.controller)
    );
    router.get(
      "/:orderId",
      this.checkJwt,
      this.controller.getSpecificOrder.bind(this.controller)
    );
    router.post(
      "/",
      this.checkJwt,
      this.controller.createOrder.bind(this.controller)
    );
    router.put(
      "/:orderId",
      this.checkJwt,
      this.controller.updateOrder.bind(this.controller)
    );
    router.delete(
      "/:orderId",
      this.checkJwt,
      this.controller.deleteOrder.bind(this.controller)
    );
    return router;
  }
}

module.exports = OrdersRouter;
