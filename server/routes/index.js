const router = require(`express`).Router();

const userRoutes = require('./userRoutes');
router.use('/users', userRoutes);

const authRoutes = require(`./authRoutes`);
router.use('/auth', authRoutes );

module.exports = router;
