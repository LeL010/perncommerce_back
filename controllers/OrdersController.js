class OrdersController {
  constructor(orderModel, userModel) {
    this.userModel = userModel;
    this.orderModel = orderModel;
  }

  async getAllOrders(req, res) {
    const userEmail = req.params.email;
    try {
      const [user] = await this.userModel.findOrCreate({
        where: {
          userEmail: userEmail,
        },
      });
      const output = await this.orderModel.findAll({
        where: { userId: user.id },
        include: this.userModel,
        order: [["id", "DESC"]],
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async getSpecificOrder(req, res) {
    const id = req.params.orderId;
    try {
      const output = await this.orderModel.findByPk(id, {
        include: this.userModel,
      });
      if (!output) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async createOrder(req, res) {
    const { userEmail, selectedProducts, totalPrice } = req.body;

    try {
      const [user] = await this.userModel.findOrCreate({
        where: {
          userEmail: userEmail,
        },
      });

      const newOrder = await this.orderModel.create({
        totalPrice: totalPrice,
        userId: user.id,
        selectedProducts: selectedProducts,
        orderStatus: "Order placed, pending for checkout",
      });

      return res.status(201).json(newOrder);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, message: err });
    }
  }

  async updateOrder(req, res) {
    const id = req.params.orderId;
    const { userEmail, selectedProducts, totalPrice } = req.body;

    try {
      const [user] = await this.userModel.findOrCreate({
        where: {
          userEmail: userEmail,
        },
      });

      const [updatedCount] = await this.orderModel.update(
        {
          userId: user.id,
          selectedProducts: selectedProducts,
          orderStatus: "Order placed, checkout done, out for delivery",
          totalPrice: totalPrice,
          dateFulfilled: new Date(),
          updatedAt: new Date(),
        },
        {
          where: { id: id },
        }
      );

      if (updatedCount === 0) {
        return res.status(404).json({ message: "Order not found" });
      }

      const updatedOrder = await this.orderModel.findByPk(id, {
        include: this.userModel,
      });
      res.json(updatedOrder);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async deleteOrder(req, res) {
    const id = req.params.orderId;

    try {
      const deletedCount = await this.orderModel.destroy({
        where: { id: id },
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.json({ message: "Order deleted" });
    } catch (error) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }
}

module.exports = OrdersController;
