class CheckoutsRouter {
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
      this.controller.getCheckoutInfoByUser.bind(this.controller)
    );
    router.get(
      "/:checkoutId",
      this.checkJwt,
      this.controller.getSpecificCheckout.bind(this.controller)
    );
    router.post(
      "/",
      this.checkJwt,
      this.controller.saveCheckoutInfo.bind(this.controller)
    );
    router.put(
      "/",
      this.checkJwt,
      this.controller.updateCheckout.bind(this.controller)
    );
    router.delete(
      "/:checkoutId",
      this.checkJwt,
      this.controller.deleteCheckout.bind(this.controller)
    );
    return router;
  }
}

module.exports = CheckoutsRouter;
