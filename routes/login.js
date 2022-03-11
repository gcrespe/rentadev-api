var express = require('express');
const UsersController = require('../controllers/UsersController');
var router = express.Router();

/* POST login. */
router.post('/login', UsersController.login);

router.post('/register', UsersController.register);

module.exports = router;
