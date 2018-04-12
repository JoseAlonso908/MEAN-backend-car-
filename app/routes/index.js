var router = require("express").Router();
router.use('/user', require("../modules/user/route"));
router.use('/dealer', require("../modules/dealer/routes"));
router.use('/car', require("../modules/cars/routes"));
router.use('/listing', require("../modules/listing/routes"));
router.use('/enquiry', require("../modules/enquiry/route"));
module.exports = router;