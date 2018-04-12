const router = require("express").Router();
const signup = require('./signup');
const login = require('./login');
const addListing  = require('./add-listing');
router.post('/signup', signup.dealerSignUp);
router.post('/login', login.dealerLogin);
router.post('/add-listing',addListing.addListing )
module.exports = router;
