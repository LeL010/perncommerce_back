class UsersController {
  constructor(model) {
    this.model = model;
  }

  async getAllUsers(req, res) {
    try {
      const output = await this.model.findAll();
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async getCurrentUser(req, res) {
    const userEmail = req.params.email;
    try {
      const [user] = await this.model.findOrCreate({
        where: {
          userEmail: userEmail,
        },
      });
      const output = await this.model.findByPk(user.id);
      return res.json(output);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: true, message: err });
    }
  }

  async createNewUser(req, res) {
    const { userRole, userName, userEmail } = req.body;
    try {
      // Retrieve seller from DB via seller email from auth
      const [user] = await this.model.findOrCreate({
        where: {
          userEmail: userEmail,
        },
      });

      const newUser = await this.model.update(
        {
          userRole: userRole,
          userName: userName,
        },
        { where: { userEmail: user.userEmail } }
      );
      return res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: true, message: err });
    }
  }
}

module.exports = UsersController;
