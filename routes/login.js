var express = require('express');
const { default: UsersController } = require('../controllers/UsersController');
var router = express.Router();

/* POST login. */
router.post('/login', UsersController.login());

module.exports = router;
