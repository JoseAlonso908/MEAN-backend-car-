var router = require("express").Router();
var user = require('./index');
router.get('/details/:id', user.getUser);
router.post('/signup', user.signup);
router.post('/login', user.login);
module.exports = router;