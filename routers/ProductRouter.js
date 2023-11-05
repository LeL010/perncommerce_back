class ProductsRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    const router = this.express.Router();

    router.get("/", this.controller.getAllProducts.bind(this.controller));
    router.get("/search", this.controller.searchProducts.bind(this.controller));
    router.get("/:productId", this.controller.getSpecificProduct.bind(this.controller));
    router.post("/", this.checkJwt, this.controller.createProduct.bind(this.controller));
    router.put("/:productId", this.checkJwt, this.controller.updateProduct.bind(this.controller));
    router.delete("/:productId", this.checkJwt, this.controller.deleteProduct.bind(this.controller));
    
    return router;
  }
}

module.exports = ProductsRouter;
