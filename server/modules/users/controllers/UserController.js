// controllers/UserController.js

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const newUser = await this.userService.createUser({
        name,
        email,
        password,
      });
      return res.status(201).json({ data: newUser.toJSON() });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
