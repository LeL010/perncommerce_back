class UsersRouter {
  constructor(express, controller, checkJwt) {
    this.express = express;
    this.controller = controller;
    this.checkJwt = checkJwt;
  }

  routes() {
    const router = this.express.Router();

    router.get("/", this.controller.getAllUsers.bind(this.controller));
    router.get("/:email", this.controller.getCurrentUser.bind(this.controller));
    router.post("/", this.controller.createNewUser.bind(this.controller));

    return router;
  }
}

module.exports = UsersRouter;
