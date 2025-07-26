const authRoutes = require(`express`).Router();
const authController =require(`../controllers/AuthController`);

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.post('/refresh', authController.refreshToken);
authRoutes.post('/logout', authController.logout);

module.exports = authRoutes;