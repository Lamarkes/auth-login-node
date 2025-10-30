
module.exports = (app) => {
  const controller = require("../controllers/userController")();
  const rateLimit = require('express-rate-limit');

  const limit = rateLimit({
    max:3,
    message: "Muitas requisiçoes, tente novamente mais tarde!"
  });

  app.use(limit);

  app
  .route("/api/v1/register")
  .post(controller.createUser);
  
  app
  .route("/api/v1/login")
  .post(controller.login);
  
  app
  .route("/api/v1/recover")
  .post(controller.recoverPassword);
  
  app.route("/api/v1/logout")
  .post(controller.logout);
  
  app.route("/api/v1/user")
  .get(controller.getUserData);

};
