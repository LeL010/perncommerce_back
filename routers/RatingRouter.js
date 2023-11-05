class RatingsRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    const router = this.express.Router();

    router.get("/:productId", this.controller.findRatingsByProduct.bind(this.controller));
    router.post("/", this.checkJwt, this.controller.giveRating.bind(this.controller)
    );

    return router;
  }
}

module.exports = RatingsRouter;
