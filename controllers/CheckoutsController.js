class CheckoutsController {
  constructor(checkoutModel, userModel) {
    this.checkoutModel = checkoutModel;
    this.userModel = userModel;
  }

  async getCheckoutInfoByUser(req, res) {
    const userEmail = req.params.email;
    try {
      const [user] = await this.userModel.findOrCreate({
        where: {
          userEmail: userEmail,
        },
      });
      const output = await this.checkoutModel.findAll({
        where: { userId: user.id },
        include: [this.userModel]
      });
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async getSpecificCheckout(req, res) {
    const id = req.params.checkoutId;
    try {
      const output = await this.checkoutModel.findByPk(id, {
        include: [this.userModel]
      });
      if (!output) {
        return res.status(404).json({ message: "Checkout information not found" });
      }
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async saveCheckoutInfo(req, res) {
    const { firstName, lastName, address1, address2, city, state, zip, country, saveAddress, cardName, cardNumber, expDate, cvv, saveCard, userEmail } = req.body;

    try {
      const [user] = await this.userModel.findOrCreate({
        where: {
          userEmail: userEmail,
        },
      });

      const newCheckout = await this.checkoutModel.create({
        firstName: firstName,
        lastName: lastName,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        country: country,
        saveAddress: saveAddress,
        cardName: cardName,
        cardNumber: cardNumber,
        expDate: expDate,
        cvv: cvv,
        saveAddress: saveAddress,
        saveCard: saveCard,
        userId: user.id,
      });

      return res.status(201).json(newCheckout);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, message: err });
    }
  }

  async updateCheckout(req, res) {
      const {
        firstName,
        lastName,
        address1,
        address2,
        city,
        state,
        zip,
        country,
        saveAddress,
        cardName,
        cardNumber,
        expDate,
        cvv,
        saveCard,
        userEmail,
      } = req.body;

    try {
      const [user] = await this.userModel.findOrCreate({
        where: {
          userEmail: userEmail,
        },
      });

      const [updatedCount] = await this.checkoutModel.update(
        {
          firstName: firstName,
          lastName: lastName,
          address1: address1,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
          country: country,
          saveAddress: saveAddress,
          cardName: cardName,
          cardNumber: cardNumber,
          expDate: expDate,
          cvv: cvv,
          saveAddress: saveAddress,
          saveCard: saveCard,
          userId: user.id,
          updatedAt: new Date(),
        },
        {
          where: { userId: user.id },
        }
      );

      if (updatedCount === 0) {
        return res.status(404).json({ message: "Checkout Info not found" });
      }

      const updatedCheckoutInfo = await this.checkoutModel.findOne({
        where: { userId: user.id },
        include: [this.userModel],
      });

      res.json(updatedCheckoutInfo);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async deleteCheckout(req, res) {
    const id = req.params.checkoutId;

    try {
      const deletedCount = await this.checkoutModel.destroy({
        where: { id: id },
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Checkout Info not found" });
      }

      return res.json({ message: "Checkout deleted" });
    } catch (error) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }
}

module.exports = CheckoutsController;
