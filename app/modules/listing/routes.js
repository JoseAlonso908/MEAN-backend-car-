const router = require("express").Router();
const add = require('./add');
router.post('/new', add.newListing);
module.exports = router;