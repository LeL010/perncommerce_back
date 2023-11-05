class RatingsController {
  constructor(ratingModel, productModel, userModel) {
    this.productModel = productModel;
    this.ratingModel = ratingModel;
    this.userModel = userModel;
  }

  async findRatingsByProduct(req, res) {
    const productId = req.params.productId;
    try {
      const output = await this.ratingModel.findAll({
        where: { productId: productId },
        include: [this.userModel, this.productModel]
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async giveRating(req, res) {
    const { ratings, userEmail, productId } = req.body;
    try {
      const [user] = await this.userModel.findOrCreate({
        where: {
          userEmail: userEmail,
        },
      });

      const output = await this.ratingModel.create({
        userId: user.id,
        productId: productId,
        ratings: ratings,
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }
}

module.exports = RatingsController;
