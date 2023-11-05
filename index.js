const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db/models/index");
const { product, user, rating, category, order, checkout } = db;

const ProductsRouter = require("./routers/ProductRouter");
const ProductsController = require("./controllers/ProductsController");

const UsersRouter = require("./routers/UserRouter");
const UsersController = require("./controllers/UsersController");

const RatingsRouter = require("./routers/RatingRouter");
const RatingsController = require("./controllers/RatingsController");

const OrdersRouter = require("./routers/OrderRouter");
const OrdersController = require("./controllers/OrdersController");

const CheckoutsRouter = require("./routers/CheckoutRouter");
const CheckoutsController = require("./controllers/CheckoutsController");

const PORT = process.env.PORT || 3000;

const app = express();

const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://pern-commerce/api",
  issuerBaseURL: `https://dev-cq6rsxn01ib3224k.au.auth0.com/`,
});

const productsController = new ProductsController(product, rating, category);
const productsRouter = new ProductsRouter(express, productsController, checkJwt).routes();

const usersController = new UsersController(user);
const usersRouter = new UsersRouter(express, usersController).routes();

const ratingsController = new RatingsController(rating, product, user);
const ratingsRouter = new RatingsRouter(express, ratingsController, checkJwt).routes();

const ordersController = new OrdersController(order, user);
const ordersRouter = new OrdersRouter(express, ordersController, checkJwt).routes();

const checkoutsController = new CheckoutsController(checkout, user);
const checkoutsRouter = new CheckoutsRouter(express, checkoutsController, checkJwt).routes();

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/ratings", ratingsRouter);
app.use("/orders", ordersRouter);
app.use("/checkouts", checkoutsRouter);

app.listen(PORT, () => {
  console.log("Application listening to port 3000");
});
