var express = require('express');
var adminController = require('../controllers/AdminController');
var router = express.Router();
var app = require('../../ApplicationInstance');

router.route('/').get(adminController.home);
router.route('/portal').get(adminController.portal);

module.exports = router;