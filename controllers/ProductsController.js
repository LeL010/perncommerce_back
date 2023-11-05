const { Sequelize, Op } = require("sequelize");
const sequelize = require("../config/sequelize"); //Sequelize instance

class ProductsController {
  constructor(productModel, ratingModel, categoryModel) {
    this.productModel = productModel;
    this.ratingModel = ratingModel;
    this.categoryModel = categoryModel;
  }

  async getAllProducts(req, res) {
    try {
      const output = await this.productModel.findAll({
        include: [this.ratingModel, this.categoryModel],
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async populateProductSearchVectors() {
    const products = await this.productModel.findAll();
    for (const product of products) {
      // Generate the search vector for each product
      const productName = product.productName;
      const productDesc = product.productDesc;

      const searchVector = Sequelize.literal(
        `to_tsvector('english', '${productName}' || ' ' || '${productDesc}')`
      );

      // Update the product_search_vector column
      product.product_search_vector = searchVector;
      await product.save();
    }
  }

  async searchProducts(req, res) {
    try {
      // Extract the search query from the request
      const { query } = req.query;
      await this.populateProductSearchVectors();

      if (query === "") {
        // If the query is empty, return all products
        const allProducts = await this.productModel.findAll({
          include: [this.ratingModel, this.categoryModel],
        });
        return res.json(allProducts);
      } else {
        // Perform the full-text search
        const results = await this.productModel.findAll({
          where: {
            [Op.or]: [
              sequelize.literal(
                `"product"."product_search_vector" @@ plainto_tsquery('english', :query)`
              ),
              {
                [Op.or]: [
                  sequelize.where(
                    sequelize.col("product.productName"),
                    "ILIKE",
                    `%${query}%`
                  ),
                  sequelize.where(
                    sequelize.col("product.productDesc"),
                    "ILIKE",
                    `%${query}%`
                  ),
                ],
              },
            ],
          },
          replacements: { query: query },
          include: [this.ratingModel, this.categoryModel],
        });
        return res.json(results);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async getSpecificProduct(req, res) {
    const id = req.params.productId;
    try {
      const output = await this.productModel.findByPk(id);
      if (!output) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async createProduct(req, res) {
    const { productName, productDesc, productPrice, quantity, image } =
      req.body;

    try {
      const newProduct = await this.productModel.create({
        productName: productName,
        productDesc: productDesc,
        productPrice: productPrice,
        quantity: quantity,
        image: image,
        userId: 1,
      });
      return res.status(201).json(newProduct);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, message: err });
    }
  }

  async updateProduct(req, res) {
    const id = req.params.productId;
    const { productName, productDesc, productPrice, quantity, image } =
      req.body;

    try {
      const [updatedCount] = await this.productModel.update(
        {
          productName: productName,
          productDesc: productDesc,
          productPrice: productPrice,
          quantity: quantity,
          image: image,
          userId: 1,
          updatedAt: new Date(),
        },
        {
          where: { id: id },
        }
      );

      if (updatedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatedProduct = await this.productModel.findByPk(id);
      res.json(updatedProduct);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async deleteProduct(req, res) {
    const id = req.params.productId;

    try {
      const deletedCount = await this.productModel.destroy({
        where: { id: id },
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json({ message: "Product deleted" });
    } catch (error) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }
}

module.exports = ProductsController;
