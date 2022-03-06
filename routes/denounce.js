var express = require('express');
const { default: DenounceController } = require('../controllers/DenouncesController');
var router = express.Router();

/* GET home page. */
router.post('/denounces/register-denounce', DenounceController.registerDenounce);

/* POST remove a denounce. */
router.post('/denounces/remove-denounce', DenounceController.removeDenounce);

/* POST denounce approval or unnaproval. */
router.post('/denounces/approve-unapprove-denounce', DenounceController.approveUnapproveDenounce);

/* GET denounce history. */
router.get('/denounces/denounce-history', DenounceController.getDenounceHistory);

/* GET denounces by location. */
router.get('/denounces/search-by-location', DenounceController.searchDenounceByLocation);

/* POST commentary to denounce. */
router.post('/denounces/add-commentary', DenounceController.addComentaryToDenounce);

module.exports = router;
