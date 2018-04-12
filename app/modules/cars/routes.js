const router = require("express").Router();
const add = require('./add');
const search = require('./search');
const listing = require('./public-listing');
router.get('/makes', add.listMakes);
router.get('/make/:makeId', add.getMakeData);
router.get('/makes/models/:makeId', add.listAllModelsByMakeId);
router.get('/makes/models_data/:makeId/:page/:limit', search.searchModelsData);
// router.get('/model/details/:modelId', listing.getModelData);
router.get('/makes/details/:modelYear/:makeName/:modelName/:styleName', listing.getModelData);		//added by superman
router.get('/makes/details/gallery_data/:styleId', listing.getModelGalleryData);	//added by superman
router.get('/model/related/:modelId', listing.getRelatedModels);
router.get('/fetch_all_makes', add.fetchAllMakes);
router.get('/fetch_make_models/:makeId', add.fetchModelsByMakeId);
router.post('/upload_model_image/:modelId', add.uploadModelImage);
router.post('/upload_make_logo/:makeId', add.updateMakeLogo);
router.get('/search/:query', search.searchCars);
module.exports = router;