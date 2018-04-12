const router = require("express").Router();
const enq = require('./index');
router.post('/new', enq.new);
router.get('/list', enq.list);


module.exports = router;