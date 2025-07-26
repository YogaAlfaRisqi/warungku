const userRoute = require(`express`).Router();
const userController = require(`../controllers/UserController`);

// RESTful routes
userRoute.get('/', userController.index);            // GET /users
userRoute.get('/:id', userController.show);          // GET /users/:id
userRoute.post('/', userController.store);           // POST /users
userRoute.put('/:id', userController.update);        // PUT /users/:id
userRoute.delete('/:id', userController.destroy);    // DELETE /users/:id

module.exports = userRoute;