module.exports = () => {
  const userService = require("../services/userService");

  const controller = {
    createUser: async (req, res) => {
      try {
        const token = await userService.criarUsuario(req.body);
        return res.status(201).json({ token });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    },

    login: async (req, res) => {
      try {
        const { email, password } = req.body;
        
        const token = await userService.login(email, password);
        res.status(200).json({ token });
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
    },

    recoverPassword: async (req, res) => {
      try {
        const { document, email, new_password } = req.body;
        const token = await userService.recoverPassword(
          document,
          email,
          new_password
        );
        res.status(200).json({ token });
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },

    logout: async (req, res) => {
      try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("SDWork ")) {
          return res.status(400).json({ error: "Token ausente." });
        }

        const token = authHeader.split(" ")[1];
        await userService.logout(token);
        res.status(200).json({ message: "Logout realizado com sucesso." });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },

    getUserData: async (req, res) => {
      try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("SDWork ")) {
          return res.status(400).json({ error: "Token ausente." });
        }

        const token = authHeader.split(" ")[1];
        const user = await userService.getUserData(token);
        res.status(200).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  };
  return controller;
};
