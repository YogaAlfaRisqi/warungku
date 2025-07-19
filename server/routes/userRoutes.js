const userRoute = require(`express`).Router();
const userController = require(`../controllers/UserController`);

userRoute.get('/', userController.index);

module.exports = userRoute;