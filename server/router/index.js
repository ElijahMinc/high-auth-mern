const Router = require('express').Router;
const userController = require('../controller/user-controller')
const router = new Router();
const { body } = require('express-validator')
const authMiddleware = require('../middleware/auth-middleware')

router.post('/registration',
   body('email').isEmail(),
   body('password').isLength({min: 3, max: 32}),
userController.registration
);

router.post('/login',
body('email').isEmail(),
body('password').isLength({min: 3, max: 32}),
userController.login);

router.post('/logout', userController.logout);// для рефреш токена
router.get('/activate/:link', userController.activate); // для активации аккаунта по ссылке
router.get('/refresh', userController.refresh);// для перезаписи access tokena (удаления токена из БД)
router.get('/users', authMiddleware, userController.getUsers);// тестовый енд для получения списка юзера


module.exports = router