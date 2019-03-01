var express = require('express');
var adminController = require('../controllers/AdminController');
var sessionController = require('../controllers/sessionController');
var router = express.Router();
var app = require('../../ApplicationInstance');

router.route('/').get(adminController.home);
router.route('/portal').get(adminController.portal);
router.route('/login').post(sessionController.login);

module.exports = router;